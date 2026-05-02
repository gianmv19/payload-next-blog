import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: true,
            admin: { hidden: true },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            ({ operation, data, req }) => {
                if(operation !== 'create') return data
                // 1. check for eligibility
                // 2. if it is, generate blur hash
                // 3. set it to data.blurDataUrl
                // 4. return data
            },
        ],
    },
}
