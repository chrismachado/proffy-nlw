const Database = require("./db");
const createProffy = require("./createProffy");

Database.then(async (db) => {
  // Inserir dados
  proffyValue = {
    name: "Christiano Machado",
    avatar:
      "https://avatars1.githubusercontent.com/u/13263520?s=460&u=cb1a6029494b45d5060fa2ee5ae3bae4273dbae9&v=4",
    whatsapp: "80028922",
    bio:
      "Inventar e criar coisas novas são o meu maior prazer.<br><br>Apaixonado por física e pelos seus eventos naturais, vamos juntos descobrir coisas maravilhosas e ter diversos <i>mind blowns</i> estudando fenômenos físicos.",
  };
  classValue = {
    subject: 1,
    cost: "0,00",
  };

  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220,
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1220,
    },
  ];
  //   pra usar await a funcao deve ser async
  //   await createProffy(db, { proffyValue, classValue, classScheduleValues });

  // Consultar dados

  // todos os proffys
  const selectedProffys = await db.all(`SELECT * FROM proffys`);

  //   console.log(selectedProffys);

  const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.* 
        FROM proffys
        JOIN classes 
        ON (proffys.id == classes.proffy_id)
        WHERE classes.proffy_id == 1;
    `);
  //   console.log(selectClassesAndProffys);

  const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id == 1
        AND class_schedule.weekday == 0
        AND class_schedule.time_from <= 520
        AND class_schedule.time_to > 520;
    `);

  console.log(selectClassesSchedules);
});
