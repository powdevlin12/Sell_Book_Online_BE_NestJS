use sell_book_online;
SELECT book_id, book_name, book_type_name,
  CASE
	WHEN book_type_name LIKE '%du lich%' AND book_name LIKE '%du lich%' THEN 15
    WHEN book_name LIKE '%du lich%' THEN 10
    WHEN book_type_name LIKE '%du lich%' THEN 5
    ELSE 1
  END AS relevance
FROM book inner join book_type on book.book_type_id = book_type.book_type_id
ORDER BY relevance DESC;
