DELIMITER $$
CREATE PROCEDURE GET_GAMES (
	IN idConsole VARCHAR(36),
    IN year VARCHAR(4),
    IN genre VARCHAR(36),
    IN saga VARCHAR(100),
    IN initialLetter VARCHAR(1),
    -- STATUS FILTERS
    IN isComplete INTEGER,
    IN isNew INTEGER,
    IN isWishlist INTEGER,
    IN isDigital INTEGER,
    IN isBacklog INTEGER,
    IN isFinished INTEGER,
    IN isPlaying INTEGER,
    -- SEARCH
    IN searchTerm VARCHAR(50),
    -- SORTING AND PAGINATION
	IN sortBy VARCHAR(40),
    IN sortDirection VARCHAR(5),
	IN recordsLimit INTEGER,
	IN recordsOffset INTEGER
)
BEGIN
	CREATE TEMPORARY TABLE IF NOT EXISTS temp_games_base AS
		SELECT g.id, g.title, g.id_console, g.saga, g.year, g.developer, g.publisher, g.is_new, g.is_complete, g.is_wishlist, g.is_digital, g.is_finished, g.is_backlog, g.is_playing, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres, g.coverurl
		FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
		WHERE g.id_console = COALESCE(idConsole, g.id_console)  -- filter by console
		AND g.year = COALESCE(year, g.year) -- filter by year
        -- filters by status >>
        AND g.is_complete = COALESCE(isComplete, g.is_complete) 
        AND g.is_new = COALESCE(isNew, g.is_new)
        AND g.is_wishlist = COALESCE(isWishlist, g.is_wishlist)
        AND g.is_digital = COALESCE(isDigital, g.is_digital)
        AND g.is_backlog = COALESCE(isBacklog, g.is_backlog)
        AND g.is_finished = COALESCE(isFinished, g.is_finished)
        AND g.is_playing = COALESCE(isPlaying, g.is_playing)
        -- filters by status <<
        -- search
        AND LOWER(REPLACE(g.title, ' ', '')) LIKE LOWER(REPLACE(searchTerm, ' ', ''))
		AND (CASE WHEN initialLetter = '#' THEN g.title regexp '^[0-9]+' 
 				ELSE (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 
 						THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' ')))
 						ELSE g.title END) LIKE CONCAT(initialLetter, "%")
 					END) -- filter by initial letter
		GROUP BY g.id;
		
	IF genre IS NOT NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_games_result AS
			SELECT * FROM temp_games_base WHERE JSON_CONTAINS(genres, CONCAT('\"', genre, '\"'));
	ELSEIF saga IS NOT NULL THEN
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_games_result AS SELECT T1.* FROM temp_games_base AS T1
		WHERE JSON_SEARCH(T1.saga, 'one', CONCAT('%', saga ,'%')) <> '';
	ELSE
		CREATE TEMPORARY TABLE IF NOT EXISTS temp_games_result AS SELECT * FROM temp_games_base;
	END IF;
    
	 SET @sql = CONCAT(
		 'SELECT id, title, id_console, saga, year, developer, publisher, is_new, is_complete, is_wishlist, is_digital, is_finished, is_backlog, is_playing, notes, genres, coverurl
		 FROM temp_games_result ',
		 'ORDER BY ',
		 (CASE WHEN sortBy IS NULL OR sortBy = "title" THEN "REGEXP_REPLACE(title, '^(?i)(a |an |the )', '') "
			   WHEN sortBy = "year" THEN 'year' END),
		IF(UPPER(sortDirection) = 'DESC', ' DESC ', ' ASC '),
		' LIMIT ',
		IF(recordsLimit is null, '10000 ', recordsLimit),
		' OFFSET ',
		IF(recordsOffset is null, '0', recordsOffset)
	 );
    
    
     PREPARE stmt FROM @sql;
     EXECUTE stmt;
     DEALLOCATE PREPARE stmt;
    
	SELECT COUNT(*) AS row_count FROM temp_games_result;
    
    DROP TEMPORARY TABLE IF EXISTS temp_games_base;
    DROP TEMPORARY TABLE IF EXISTS temp_games_result;
END$$
DELIMITER ;

-- DELETE SP
DROP PROCEDURE GET_GAMES;

-- STORED PROCEDURE TEST


-- get all games
call GET_GAMES (
	null, -- IN idConsole VARCHAR(36),
	null, -- IN year VARCHAR(4),
	null, -- IN genre VARCHAR(36),
	null, -- IN saga VARCHAR(100),
	'', -- IN initialLetter VARCHAR(1),
	-- STATUS FILTERS
	null, -- IN isComplete INTEGER,
	null, -- IN isNew INTEGER,
	null, -- IN isWishlist INTEGER,
	null, -- IN isDigital INTEGER,
	null, -- IN isBacklog INTEGER,
	null, -- IN isFinished INTEGER,
	-- SEARCH
  '%%', -- IN searchTerm VARCHAR(50)
	-- SORTING AND PAGINATION
	null, -- IN sortBy VARCHAR(40),
  null, -- IN sortDirection VARCHAR(5),
	null, -- IN recordsLimit INTEGER,
	null-- IN recordsOffset INTEGER
);


