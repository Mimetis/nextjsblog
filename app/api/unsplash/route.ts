import { getUnsplashImage, searchUnsplashImages } from '@/lib/unsplash';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {

    let criteria = request.nextUrl.searchParams.get('search');

    if (!criteria)
        return notFound();

    let unsplashImages = await searchUnsplashImages(criteria);

    if (unsplashImages === undefined || unsplashImages.length <= 0)
        return notFound();

    return NextResponse.json(unsplashImages);
}
