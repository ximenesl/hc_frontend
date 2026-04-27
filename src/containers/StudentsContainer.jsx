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
        const [usersRes, cursosRes, certsRes] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/cursos'),
          api.get('/api/certificates')
        ]);

        const certs = certsRes.data;

        // Formatar os cursos
        const formattedCourses = cursosRes.data.map(c => ({
          id: c.id,
          name: c.nome,
          // Simulando turmas já que não temos entidade Turma
          classes: [`T-${c.id}-01`]
        }));
        setCoursesWithClasses(formattedCourses);

        // Filtrar apenas alunos
        const alunos = usersRes.data.filter(u => u.role === 'ALUNO');
        
        const formattedStudents = alunos.map(aluno => {
          // Filtrar certificados aprovados desse aluno para somar as horas
          const alunoCerts = certs.filter(c => c.alunoId === aluno.id && (c.status === 'APROVADO' || c.status === 'DEFERIDO' || c.status === 'VALIDADO'));
          const horasCompletas = alunoCerts.reduce((acc, curr) => acc + (curr.cargaHoraria || 0), 0);
          
          return {
            id: aluno.id,
            nome: aluno.nome,
            matricula: `MAT-${aluno.id}`, // Simulando matricula se nao tiver
            codigoTurma: aluno.curso ? `T-${aluno.curso.id}-01` : '-',
            codigoCurso: aluno.curso ? aluno.curso.id : null,
            horasCompletas: horasCompletas,
            horasTotais: 100 // Exemplo de horas totais necessárias
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
