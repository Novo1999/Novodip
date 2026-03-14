import emailjs from '@emailjs/browser'
import { toast } from 'sonner'

const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID
const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY

export type EmailPayload = {
  name: string
  email: string
  message: string
}

export const sendEmail = async (data: EmailPayload) => {
  const templateParams = {
    from_name: data.name,
    user_email: data.email,
    subject: 'Portfolio Contact',
    message: data.message,
  }

  try {
    await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
    })

    toast.success('Email sent successfully')
    return true
  } catch (error: any) {
    toast.error(error?.text || 'Failed to send email')
    return false
  }
}
