-- deletes everything except the top 50 high scores
delete from snakehighscores
where score < (
    select score from snakehighscores
    order by score desc
    limit 1
    offset 49
)