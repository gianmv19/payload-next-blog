import type { CollectionConfig, FieldHook } from 'payload'
import { generateSlugHook } from './hooks/generate-slug-hook'
import {generateContentSummaryHook} from "@/collections/Articles/hooks/generate-content-summary.hook";
import {convertLexicalToPlaintext} from "@payloadcms/richtext-lexical/plaintext";

// fields
// Done - title
// Done - slug (auto-generated from title)
// - read_time_in_mins (auto-generated from content)
// - cover_image
// - author (relations)
// - status (draft, published)
// - published_at (only visible when status is published)

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateSlugHook]
            }
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: { beforeValidate: [generateContentSummaryHook] },
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        // ensure that data is not stored in DB
                        delete siblingData.readTimeInMins
                    },
                ],
                afterRead: [
                    ({ data }) => {
                        //data.content
                        const text = convertLexicalToPlaintext({ data: data?.content })
                        const wordsPerMinute = 200
                        const words = text.trim().split(/\s/).length
                        return Math.max(1, Math.ceil(words / wordsPerMinute)) // wpm
                    },
                ],
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: "media",
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: "article-authors",
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            required: true,
            options: ['Draft', 'Published'],
            defaultValue: 'Draft',
        },
        {
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === 'Published',
                date: { pickerAppearance: 'dayAndTime' },
            }
        },
    ],
}