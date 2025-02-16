import nodemailer from "nodemailer";

// Create a function to get transporter with dynamic configuration
const createTransporter = () => {
    // Check if using Gmail
    if (process.env.EMAIL_SERVICE === 'gmail') {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    // Generic SMTP configuration
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: process.env.NODE_ENV === 'production'
        }
    });
};

export const sendResetPasswordEmail = async (email, token) => {
    // Validate input
    if (!email || !token) {
        throw new Error('Email and token are required');
    }

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
        from: `"Password Reset" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Ссылка для сброса пароля",
        text: `Привет! Перейдите по следующей ссылке для смены пароля: ${resetLink}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Сброс пароля</h2>
                <p>Привет!</p>
                <p>Вы запросили сброс пароля. Перейдите по следующей ссылке:</p>
                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                    Сбросить пароль
                </a>
                <p>Если вы не запрашивали сброс пароля, проигнорируйте это письмо.</p>
                <small>Ссылка действительна в течение 1 часа.</small>
            </div>
        `
    };

    try {
        // Create transporter dynamically
        const transporter = createTransporter();

        // Verify connection configuration
        await new Promise((resolve, reject) => {
            transporter.verify((error) => {
                if (error) {
                    console.error('Transporter verification failed:', error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully:', {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected
        });

        return info;
    } catch (error) {
        // Detailed error logging
        console.error('Comprehensive email sending error:', {
            message: error.message,
            stack: error.stack,
            code: error.code,
            response: error.response,
            responseCode: error.responseCode,
            emailConfig: {
                service: process.env.EMAIL_SERVICE,
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                user: process.env.EMAIL_USER ? 'PROVIDED' : 'MISSING'
            }
        });

        // Throw a more informative error
        throw new Error(`Не удалось отправить email: ${error.message}`);
    }
};
