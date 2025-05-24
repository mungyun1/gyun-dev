import { NextResponse } from "next/server";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth } from "@/lib/firebase";

const db = getFirestore();

export async function GET() {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "게시물 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const data = await request.json();
    const postsRef = collection(db, "posts");
    const docRef = await addDoc(postsRef, {
      ...data,
      authorId: currentUser.uid,
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "게시물 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
