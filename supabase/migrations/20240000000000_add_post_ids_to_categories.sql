-- 카테고리 테이블에 post_ids 컬럼 추가
ALTER TABLE categories
ADD COLUMN post_ids integer[] DEFAULT '{}';

-- post_ids를 업데이트하는 함수 생성
CREATE OR REPLACE FUNCTION update_category_post_ids()
RETURNS TRIGGER AS $$
BEGIN
    -- 새로운 포스트가 추가되거나 카테고리가 변경된 경우
    IF (TG_OP = 'INSERT') OR (TG_OP = 'UPDATE' AND OLD.category_id IS DISTINCT FROM NEW.category_id) THEN
        -- 이전 카테고리에서 post_id 제거 (UPDATE의 경우)
        IF (TG_OP = 'UPDATE' AND OLD.category_id IS NOT NULL) THEN
            UPDATE categories
            SET post_ids = array_remove(post_ids, OLD.id)
            WHERE id = OLD.category_id;
        END IF;

        -- 새로운 카테고리에 post_id 추가
        IF NEW.category_id IS NOT NULL THEN
            UPDATE categories
            SET post_ids = array_append(post_ids, NEW.id)
            WHERE id = NEW.category_id;
        END IF;
    END IF;

    -- 포스트가 삭제된 경우
    IF (TG_OP = 'DELETE') AND OLD.category_id IS NOT NULL THEN
        UPDATE categories
        SET post_ids = array_remove(post_ids, OLD.id)
        WHERE id = OLD.category_id;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
DROP TRIGGER IF EXISTS update_category_post_ids_trigger ON posts;
CREATE TRIGGER update_category_post_ids_trigger
AFTER INSERT OR UPDATE OR DELETE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_category_post_ids();

-- 기존 데이터에 대해 post_ids 초기화
UPDATE categories c
SET post_ids = ARRAY(
    SELECT id
    FROM posts
    WHERE category_id = c.id
    ORDER BY id
); 