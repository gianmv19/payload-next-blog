import { seedAdmin } from "./seeders/admin.seeder";
import {getPayloadClient} from "@/lib/payload/client";
import {seedArticleAuthor} from "@/scripts/seed/seeders/article-author.seeder";

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload)
        await seedArticleAuthor(payload)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

void main()