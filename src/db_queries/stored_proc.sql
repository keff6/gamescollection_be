DELIMITER $$
CREATE PROCEDURE GET_GAMES (
	IN idConsole VARCHAR(36),
    IN year VARCHAR(4),
    IN genre VARCHAR(36),
    in saga VARCHAR(100)
)
BEGIN
	IF genre IS NOT NULL THEN
		SELECT T1.* FROM (
			SELECT g.id, g.title, g.id_console, g.saga, g.year, g.is_new, g.is_complete, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres
			FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
			WHERE g.id_console = COALESCE(idConsole, g.id_console)
			AND g.year = COALESCE(year, g.year)
			GROUP BY g.id
		) AS T1
        WHERE JSON_CONTAINS(T1.genres, CONCAT('\"', genre, '\"'));
	ELSEIF saga IS NOT NULL THEN
		SELECT T1.* FROM (
			SELECT g.id, g.title, g.id_console, g.saga, g.year, g.is_new, g.is_complete, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres
			FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
			WHERE g.id_console = COALESCE(idConsole, g.id_console)
			AND g.year = COALESCE(year, g.year)
			GROUP BY g.id
		) AS T1
		WHERE JSON_SEARCH(T1.saga, 'one', CONCAT('%', saga ,'%')) <> '';
    ELSE
		SELECT g.id, g.title, g.id_console, g.saga, g.year, g.is_new, g.is_complete, g.notes, JSON_ARRAYAGG(gxg.id_genre) AS genres
		FROM game AS g LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
		WHERE g.id_console = COALESCE(idConsole, g.id_console)
		AND g.year = COALESCE(year, g.year)
		GROUP BY g.id;
	END IF;
END$$
DELIMITER ;



DROP PROCEDURE GET_GAMES;


-- STORED PROCEDURE TEST

-- call GET_GAMES(idConsole, year, genre, saga);
-- get all games
call GET_GAMES(null, null, null, null);
-- get games by console
call GET_GAMES('4c36418d-4661-4a67-837b-905bcda087c2', null, null, null);
-- get games by year
call GET_GAMES(null, '1996', null, null);
-- get games by genre
call GET_GAMES(null, null, '6612654d-c14d-4808-bbd7-52657ad3795e', null);
-- get games by saga
call GET_GAMES(null, null, null, 'Crash');

