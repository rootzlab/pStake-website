import { NextResponse } from "next/server";
import { DEFAULT_MEDIUM_SOURCE } from "@/app/utils/medium";
import { fetchMediumWithFallback } from "./fetchLogic";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source") ?? searchParams.get("feed") ?? DEFAULT_MEDIUM_SOURCE;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;

    // 🔍 添加调试日志
    console.log('========== API REQUEST START ==========');
    console.log('[DEBUG] Request params:', { source, limitParam, limit });
    console.log('[DEBUG] RAPIDAPI_KEY exists:', !!process.env.RAPIDAPI_KEY);

    try {
        const payload = await fetchMediumWithFallback(source, limit ?? 30);

        // 🔍 添加详细结果日志
        console.log('[DEBUG] Final result:', {
            dataSource: payload.dataSource,
            articlesCount: payload.articles.length,
        });
        console.log('========== API REQUEST END ==========\n');

        return NextResponse.json({ ...payload, source });
    } catch (error) {
        console.error("[Medium] All data sources failed:", error);
        console.log('========== API REQUEST FAILED ==========\n');
        return NextResponse.json(
            {
                error: "Unable to fetch Medium articles.",
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 502 }
        );
    }
}
