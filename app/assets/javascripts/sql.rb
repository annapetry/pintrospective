SELECT
  boards.id
FROM
  boards
JOIN
  follows
ON
  (
  (boards.id = follows.followable_id
    AND
    follows.followable_type = 'Board')
  OR
   (boards.user_id = follows.followable_id
    AND
    follows.followable_type = 'User')
  )
WHERE
  follows.user_id = 5;

  Board.select("boards.id")
    .distinct
    .joins("(boards.id = follows.followable_id AND follows.followable_type = 'Board') OR (boards.user_id = follows.followable_id AND follows.followable_type = 'User')")
    .where("follows.user_id = ?", 5)


["SELECT DISTINCT boards.id FROM boards JOIN follows ON ((boards.id = follows.followable_id AND follows.followable_type = :board) OR (boards.user_id = follows.followable_id AND follows.followable_type = :user)) WHERE follows.user_id = :user_id", { :board => 'Board', :user => 'User', :user_id  => 5 }]