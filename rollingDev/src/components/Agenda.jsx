
const scheduleData = [
  { time: '18:00', title: 'Acreditación y bienvenida', speaker: '' },
  { time: '18:20', title: 'Tu primer día como developer', speaker: 'Daniela Cardozo' },
  { time: '18:40', title: 'De cero a tu primer proyecto', speaker: 'Franco Díaz' },
  { time: '19:00', title: 'Armá tu portfolio con IA', speaker: 'Gaston' },
  { time: '19:20', title: 'Git y GitHub sin miedo', speaker: 'Mauro' },
  { time: '19:40', title: 'Tu primer backend con Node', speaker: 'Jose Díaz' },
  { time: '20:00', title: 'Preparate para tu primera entrevista', speaker: 'Tomas Gomez' },
  { time: '20:20', title: 'Mi primer trabajo en IT', speaker: 'Pablo Basso' },
  { time: '20:40', title: 'Testing: cómo no romper todo', speaker: 'Julian Martin' },
  { time: '21:00', title: 'Diseño para developers', speaker: 'Tomas Escudero' },
  { time: '21:20', title: 'Tu primera base de datos', speaker: 'Andres Perlo' },
  { time: '21:40', title: 'Preguntas y networking', speaker: '' }
];


const ScheduleItem = ({ time, title, speaker }) => (
  <li className="py-3 flex flex-row gap-4 items-start border-b bg-negro-pagina last:border-b-0">
    <span className="text-red-500 font-mono font-semibold min-w-15">
      {time}
    </span>
    <div>
      <h3 className="font-medium text-gray-100">{title}</h3>
      {speaker && (
        <p className="text-gray-400 text-sm mt-0.5">{speaker}</p>
      )}
    </div>
  </li>
);

const Agenda = () => {
  return (
    <div className="min-h-screen bg-negro-pagina text-gray-100 flex items-center justify-center p-4 font-jakarta">
      <div className="w-full max-w-4xl color-gris-fuerte rounded-lg shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="p-8 flex flex-col justify-start border-b md:border-b-0 md:border-r color-gris-fuerte">
            <p className="text-red-500 font-semibold text-sm uppercase tracking-wider mb-2">
              Agenda
            </p>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
              Jueves 19 de<br />noviembre
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Diez charlas cortas para salir con un plan claro.<br />
              Al final queda tiempo para preguntas y networking.
            </p>
          </div>
          <div className="md:col-span-2 p-6">
            <ul className="divide-y">
              {scheduleData.map((event, index) => (
                <ScheduleItem
                  key={index}
                  time={event.time}
                  title={event.title}
                  speaker={event.speaker}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;