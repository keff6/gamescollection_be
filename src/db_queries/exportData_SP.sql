DELIMITER $$
CREATE PROCEDURE EXPORT_DATA (
	IN idConsole VARCHAR(36),
    IN idBrand VARCHAR(36),
    -- STATUS FILTERS
    IN isComplete INTEGER,
    IN isNew INTEGER,
    IN isWishlist INTEGER,
    IN isDigital INTEGER,
    IN isBacklog INTEGER,
    IN isFinished INTEGER
)
BEGIN
	SELECT
		b.name AS Brand,
		c.name AS Console,
		c.year AS ConsoleYear,
		g.title AS Game,
		g.year AS GameYear,
		GROUP_CONCAT(gen.name ORDER BY gen.name SEPARATOR ', ') AS Genres,
		g.developer AS Developer,
		g.publisher AS Publisher,
		CASE WHEN g.is_new = 1 THEN 'New'
			  WHEN g.is_complete = 1 THEN 'Complete'
			  WHEN g.is_digital = 1 THEN 'Digital' 
			  ELSE 'Incomplete' END AS 'Condition',
		CASE WHEN is_finished = 1 THEN 'YES' ELSE 'NO' END AS Finished,
		g.notes AS Notes
	FROM game AS g
	JOIN console AS c ON g.id_console = c.id
	JOIN brand AS b ON c.id_brand = b.id
	LEFT JOIN game_x_genre AS gxg ON g.id = gxg.id_game
    LEFT JOIN genre AS gen ON gen.id = gxg.id_genre
	WHERE
	  b.id = COALESCE(idBrand, b.id)
	  AND c.id = COALESCE(idConsole, c.id)
	  -- filters by status >>
	  AND g.is_complete = COALESCE(isComplete, g.is_complete) 
	  AND g.is_new = COALESCE(isNew, g.is_new)
	  AND g.is_wishlist = COALESCE(isWishlist, g.is_wishlist)
	  AND g.is_digital = COALESCE(isDigital, g.is_digital)
	  AND g.is_backlog = COALESCE(isBacklog, g.is_backlog)
	  AND g.is_finished = COALESCE(isFinished, g.is_finished)
	  -- filters by status <<
	GROUP BY g.id
	ORDER BY b.name ASC, c.name ASC, g.title ASC;
END$$
DELIMITER ;

-- DELETE SP
DROP PROCEDURE EXPORT_DATA;

-- Export all games
call EXPORT_DATA (
	null, -- IN idConsole VARCHAR(36),
	null, -- IN idBrand VARCHAR(36),
	-- STATUS FILTERS
	null, -- IN isComplete INTEGER,
	null, -- IN isNew INTEGER,
	null, -- IN isWishlist INTEGER,
	null, -- IN isDigital INTEGER,
	null, -- IN isBacklog INTEGER,
	null -- IN isFinished INTEGER,
);