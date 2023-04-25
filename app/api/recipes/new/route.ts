import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET() {
    const res = await fetch('https://data.mongodb-api.com/...', {
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY || '',
        },
    });
    const data = await res.json();

    return NextResponse.json({ data })
}


export async function POST(request: NextRequest): Promise<NextResponse> {
    const res = await request.json();

    let newRecipe = await prisma.recipe.findFirst({ where: { slug: res.slug } })

    if (newRecipe) {
        newRecipe = await prisma.recipe.update({
            data: {
                authorId: 'SP',
                description: res.description,
                ingredients: res.ingredients,
                pictureUrl: res.pictureUrl,
                thumbnailUrl: res.thumbnailUrl,
                blurDataUrl: res.blurDataUrl,
                recipe: res.recipe,
                slug: res.slug,
                title: res.title,
            },
            where: {
                slug: res.slug
            }
        });
    }
    else {
        newRecipe = await prisma.recipe.create({
            data: {
                authorId: 'SP',
                title: res.title,
                description: res.description,
                ingredients: res.ingredients,
                pictureUrl: res.pictureUrl,
                thumbnailUrl: res.thumbnailUrl,
                blurDataUrl: res.blurDataUrl,
                recipe: res.recipe,
                slug: res.slug,
            }
        })

    }

    return NextResponse.json(newRecipe);

}