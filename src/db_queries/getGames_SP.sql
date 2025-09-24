USE `gamescollection`;

DELIMITER $$
CREATE PROCEDURE GET_GAMES (
	IN idConsole VARCHAR(36),
    IN year VARCHAR(4),
    IN genre VARCHAR(36),
    IN saga VARCHAR(100),
    IN initialLetter VARCHAR(1),
    IN sortBy VARCHAR(40)
)
BEGIN
	IF genre IS NOT NULL THEN
		SELECT T1.* FROM (
			SELECT g.id, g.title, g.id_console, g.saga, g.year, g.developer, g.publisher, g.is_new, g.is_complete, g.is_wishlist, g.is_digital, g.is_finished, g.is_backlog, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres, g.coverurl
			FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
			WHERE g.id_console = COALESCE(idConsole, g.id_console)
				AND g.year = COALESCE(null, g.year)
                AND (CASE WHEN initialLetter = '#' THEN g.title regexp '^[0-9]+' 
						ELSE (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 
								THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' ')))
								ELSE g.title END) LIKE CONCAT(initialLetter, "%")
							END)
			GROUP BY g.id
			ORDER BY (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' '))) ELSE g.title END) asc
		) AS T1
        WHERE JSON_CONTAINS(T1.genres, CONCAT('\"', genre, '\"'));
	ELSEIF saga IS NOT NULL THEN
		SELECT T1.* FROM (
			SELECT g.id, g.title, g.id_console, g.saga, g.year, g.developer, g.publisher, g.is_new, g.is_complete, g.is_wishlist, g.is_digital, g.is_finished, g.is_backlog, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres, g.coverurl
			FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
			WHERE g.id_console = COALESCE(idConsole, g.id_console)
				AND g.year = COALESCE(null, g.year)
                AND (CASE WHEN initialLetter = '#' THEN g.title regexp '^[0-9]+' 
					ELSE (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 
							THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' ')))
							ELSE g.title END) LIKE CONCAT(initialLetter, "%")
						END)
			GROUP BY g.id
			ORDER BY (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' '))) ELSE g.title END) asc
		) AS T1
		WHERE JSON_SEARCH(T1.saga, 'one', CONCAT('%', saga ,'%')) <> '';
    ELSE
		SELECT g.id, g.title, g.id_console, g.saga, g.year, g.developer, g.publisher, g.is_new, g.is_complete, g.is_wishlist, g.is_digital, g.is_finished, g.is_backlog, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres, g.coverurl
		FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
		WHERE g.id_console = COALESCE(idConsole, g.id_console)
			AND g.year = COALESCE(null, g.year)
            AND (CASE WHEN initialLetter = '#' THEN g.title regexp '^[0-9]+' 
				ELSE (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 
						THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' ')))
						ELSE g.title END) LIKE CONCAT(initialLetter, "%")
					END)
		GROUP BY g.id
		ORDER BY (CASE WHEN g.title REGEXP '^(A|An|The)[[:space:]]' = 1 THEN TRIM(SUBSTR(g.title , INSTR(g.title ,' '))) ELSE g.title END) asc;
	END IF;
END$$
DELIMITER ;

-- DELETE SP
DROP PROCEDURE GET_GAMES;

-- STORED PROCEDURE TEST

-- call GET_GAMES(idConsole, year, genre, saga, initialLetter, sortBy);
-- get all games
call GET_GAMES(null, null, null, null, '', null);
-- get games by console
call GET_GAMES('4c36418d-4661-4a67-837b-905bcda087c2', null, null, null, '', null);
-- get games by console and intitial letter
call GET_GAMES('4c36418d-4661-4a67-837b-905bcda087c2', null, null, null, 'a', null);
-- get games by year
call GET_GAMES(null, '1996', null, null, '', null);
-- get games by genre
call GET_GAMES(null, null, '6612654d-c14d-4808-bbd7-52657ad3795e', null, '', null);
-- get games by saga
call GET_GAMES(null, null, null, 'Crash', '', null);

