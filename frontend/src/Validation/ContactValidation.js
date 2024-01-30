import * as yup from 'yup'

export const contactSchema = yup.object().shape({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    message: yup.string().min(5).required()
})
