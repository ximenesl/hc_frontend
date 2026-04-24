import React, { useState } from 'react';
import StudentsScreen from '../components/StudentsScreen';

const StudentsContainer = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const coursesWithClasses = [
    { id: 'curso-ads', name: 'Análise e Desenvolvimento de Sistemas', classes: ['TAD-01', 'TAD-02'] },
    { id: 'curso-jogos', name: 'Jogos Digitais', classes: ['JD-01', 'JD-02'] }
  ];

  const students = [
    {
      id: 1,
      nome: 'Carlos de Oliveira',
      matricula: '202101234',
      codigoTurma: 'TAD-01',
      codigoCurso: 'curso-ads',
      horasCompletas: 100,
      horasTotais: 100,
    },
    {
      id: 2,
      nome: 'Ana Souza',
      matricula: '202101235',
      codigoTurma: 'TAD-02',
      codigoCurso: 'curso-ads',
      horasCompletas: 60,
      horasTotais: 100,
    },
    {
      id: 3,
      nome: 'Pedro Santos',
      matricula: '202101236',
      codigoTurma: 'JD-01',
      codigoCurso: 'curso-jogos',
      horasCompletas: 90,
      horasTotais: 100,
    },
    {
      id: 4,
      nome: 'Lucas Almeida',
      matricula: '202101237',
      codigoTurma: 'JD-02',
      codigoCurso: 'curso-jogos',
      horasCompletas: 45,
      horasTotais: 100,
    }
  ];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredStudents = students.filter(student => {
    const term = searchText.toLowerCase();
    const matchSearch = student.nome.toLowerCase().includes(term) ||
      student.matricula.toLowerCase().includes(term) ||
      student.codigoTurma.toLowerCase().includes(term);

    const matchCourse = selectedCourse ? student.codigoCurso === selectedCourse : true;
    const matchClass = selectedClass ? student.codigoTurma === selectedClass : true;

    return matchSearch && matchCourse && matchClass;
  });

  const availableClasses = selectedCourse 
    ? coursesWithClasses.find(c => c.id === selectedCourse)?.classes || []
    : [];

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedClass(null);
  };

  return (
    <StudentsScreen
      students={filteredStudents}
      onSearch={handleSearch}
      courses={coursesWithClasses}
      availableClasses={availableClasses}
      selectedCourse={selectedCourse}
      selectedClass={selectedClass}
      onCourseChange={handleCourseChange}
      onClassChange={setSelectedClass}
    />
  );
};

export default StudentsContainer;
