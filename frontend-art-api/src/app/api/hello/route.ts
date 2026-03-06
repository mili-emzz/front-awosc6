import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        message: '¡Hola! Este es mi primer Route Handler funcionando',
        status: 'success',
        data: {
            ejemplo: 'Aquí puedes devolver data de una base de datos o de otra API',
        }
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    return NextResponse.json({
        message: 'Recibí tus datos por POST',
        recibido: body
    });
}
