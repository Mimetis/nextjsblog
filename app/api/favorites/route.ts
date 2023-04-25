import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const res = await request.json();

    let fav = await prisma.favorite.findFirst({ where: { userId: res.userId, recipeId: res.recipeId } })

    if (fav) {
        await prisma.favorite.delete({ where: { id: fav.id } });
        fav = null;
    }
    else {
        fav = await prisma.favorite.create({
            data: { userId: res.userId, recipeId: res.recipeId }
        })

    }

    return NextResponse.json(fav);
}
