import { getUnsplashImage } from '@/lib/unsplash';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    let unsplashImage = getUnsplashImage(params.id);

    if (unsplashImage === undefined)
        return notFound();

    return NextResponse.json(unsplashImage);
}
