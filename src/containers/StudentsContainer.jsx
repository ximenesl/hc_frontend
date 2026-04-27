import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import StudentsScreen from '../components/StudentsScreen';
import api from '../api/axiosConfig';

const StudentsContainer = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [coursesWithClasses, setCoursesWithClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, cursosRes, certsRes, turmasRes] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/cursos'),
          api.get('/api/certificates'),
          api.get('/api/turmas')
        ]);

        const certs = certsRes.data;
        const turmas = turmasRes.data;

        const formattedCourses = cursosRes.data.map(c => {
          const courseTurmas = turmas.filter(t => t.cursoId === c.id);
          return {
            id: c.id,
            name: c.nome,
            classes: courseTurmas.map(t => t.nome)
          };
        });
        setCoursesWithClasses(formattedCourses);

        const alunos = usersRes.data.filter(u => u.role === 'ALUNO');
        
        const formattedStudents = alunos.map(aluno => {
          const alunoCerts = certs.filter(c => c.alunoId === aluno.id && (c.status === 'APROVADO' || c.status === 'DEFERIDO' || c.status === 'VALIDADO'));
          const horasCompletas = alunoCerts.reduce((acc, curr) => acc + (curr.cargaHoraria || 0), 0);
          
          let turmaName = '-';
          if (aluno.turma) {
             turmaName = aluno.turma.nome;
          }

          return {
            id: aluno.id,
            nome: aluno.nome,
            matricula: `MAT-${aluno.id}`,
            codigoTurma: turmaName,
            codigoCurso: aluno.curso ? aluno.curso.id : null,
            horasCompletas: horasCompletas,
            horasTotais: aluno.curso && aluno.curso.horasTotais ? aluno.curso.horasTotais : 100
          };
        });

        setStudents(formattedStudents);
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar dados dos alunos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      loading={loading}
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
