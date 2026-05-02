import {getPayload, Payload} from "payload";
import config from '@/payload.config'
import {isDuplicateError} from "@/scripts/seed/lib/is-duplicate-error";

export async function seedAdmin(payload: Payload) {
    try {
        const response = await payload.create({
            collection: 'users',
            data: {
                email: process.env.CMS_SEED_ADMIN_EMAIL || '',
                password: process.env.CMS_SEED_ADMIN_PASSWORD || '',
            }
        })
        console.log('admin user created', response)
    } catch (error) {
        if (isDuplicateError(error, 'email')) {
            console.log('Admin user already exists')
        } else {
            console.error('Error seeding admin user', JSON.stringify(error, null, 2))
        }
    }
}