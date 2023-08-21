// export const queryMatchupTags = teamId =>
//   `SELECT athletes.rid,athletes.id,athletes.team_id, tags_master.tag_id FROM athletes INNER JOIN tags_master ON (tags_master.athlete_id = athletes.id AND tags_master.tag_id IS NOT NULL) WHERE athletes.team_id IN (${teamId})`;
// export const queryMatchupData = (currentPage, searchValue = '%') =>
//   `SELECT schedule.id,schedule.court,schedule.div,schedule.team_1_id,schedule.team_2_id,schedule.sdate,schedule.stime, teams.name AS name1, teams2.name AS name2, team_flags1.flag AS flagTeam1, team_flags2.flag AS flagTeam2 FROM schedule LEFT JOIN teams ON schedule.team_1_id = teams.id LEFT JOIN teams AS teams2 ON schedule.team_2_id = teams2.id LEFT JOIN team_flags AS team_flags1 ON schedule.team_1_id = team_flags1.team_id LEFT JOIN team_flags AS team_flags2 ON schedule.team_2_id = team_flags2.team_id WHERE court like "${searchValue}" LIMIT 10 OFFSET ${currentPage}`;

// export const queryDeleteTagsData = (athleteId, elementId) =>
//   `DELETE FROM tags_master WHERE ( athlete_id = ${athleteId} AND tag_id = ${elementId})`;
// export const queryInsertTagsData = `INSERT OR IGNORE INTO tags_master (athlete_id, coach_id, tag_id) VALUES (?, ?, ?)`;
// export const queryGetALLTags = `SELECT * FROM tags WHERE tags.deleted_at IS NULL`;
