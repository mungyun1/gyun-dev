import { NextResponse } from "next/server";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";

const db = getFirestore();

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: docSnap.id,
      ...docSnap.data(),
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "게시물을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const data = await request.json();
    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (docSnap.data().authorId !== currentUser.uid) {
      return NextResponse.json(
        { error: "게시물을 수정할 권한이 없습니다." },
        { status: 403 }
      );
    }

    await updateDoc(docRef, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "게시물 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const docRef = doc(db, "posts", params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (docSnap.data().authorId !== currentUser.uid) {
      return NextResponse.json(
        { error: "게시물을 삭제할 권한이 없습니다." },
        { status: 403 }
      );
    }

    await deleteDoc(docRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "게시물 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
