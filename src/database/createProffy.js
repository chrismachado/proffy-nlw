module.exports = async function (
  db,
  { proffyValue, classValue, classScheduleValues }
) {
  // inserir dados na tabela proffys
  const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name, 
            avatar, 
            whatsapp, 
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `);

  const proffy_id = insertedProffy.lastID;

  const insertedClass = await db.run(`
            INSERT INTO classes (
                proffy_id,
                subject,
                cost
            ) VALUES (
                "${proffy_id}",
                "${classValue.subject}",
                "${classValue.cost}"
            );
    `);

  const class_id = insertedClass.lastID;

  const insertedAllClassScheduleValues = classScheduleValues.map(
    (schedule_item) => {
      return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${schedule_item.weekday}",
                "${schedule_item.time_from}",
                "${schedule_item.time_to}"
            );
        `);
    }
  );

  await Promise.all(insertedAllClassScheduleValues);
};
