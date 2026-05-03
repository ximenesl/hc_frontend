import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import StudentsScreen from '../components/StudentsScreen';
import api from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';

const StudentsContainer = () => {
  const { isCoordenador, cursoIds } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  const [coursesWithClasses, setCoursesWithClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, cursosRes, turmasRes] = await Promise.all([
          api.get('/api/users'),
          api.get('/api/cursos'),
          api.get('/api/turmas')
        ]);

        const turmas = turmasRes.data;

        let filteredCursos = cursosRes.data;
        if (isCoordenador) {
          filteredCursos = filteredCursos.filter(c => cursoIds.includes(c.id));
        }

        const formattedCourses = filteredCursos.map(c => {
          const courseTurmas = turmas.filter(t => t.cursoId === c.id);
          return {
            id: c.id,
            name: c.nome,
            classes: courseTurmas.map(t => t.nome)
          };
        });
        setCoursesWithClasses(formattedCourses);

        let alunos = usersRes.data.filter(u => u.role === 'ALUNO');
        if (isCoordenador) {
          alunos = alunos.filter(aluno => 
            aluno.cursos && aluno.cursos.some(c => cursoIds.includes(c.id))
          );
        }
        
        const formattedStudents = alunos.map(aluno => {
          let turmaName = '-';
          if (aluno.turma) {
             turmaName = aluno.turma.nome;
          }

          const firstCurso = (aluno.cursos && aluno.cursos.length > 0) ? aluno.cursos[0] : null;

          return {
            id: aluno.id,
            nome: aluno.nome,
            matricula: `MAT-${aluno.id}`,
            codigoTurma: turmaName,
            codigoCurso: firstCurso ? firstCurso.id : null,
            cursoNome: firstCurso ? firstCurso.nome : 'Não vinculado',
            horasCompletas: aluno.horasAprovadas || 0,
            horasTotais: firstCurso && firstCurso.horasTotais ? firstCurso.horasTotais : 100,
            ativo: aluno.ativo
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
  }, [isCoordenador, cursoIds]);



  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredStudents = students.filter(student => {
    const term = searchText.toLowerCase();
    
    const matchSearch = (
      (student.nome && student.nome.toLowerCase().includes(term)) ||
      (student.matricula && student.matricula.toLowerCase().includes(term)) ||
      (student.codigoTurma && student.codigoTurma.toLowerCase().includes(term))
    );

    const matchCourse = selectedCourse ? student.codigoCurso === selectedCourse : true;
    const matchClass = selectedClass ? student.codigoTurma === selectedClass : true;
    const matchStatus = showInactive ? student.ativo === false : student.ativo !== false;

    return matchSearch && matchCourse && matchClass && matchStatus;
  });

  const availableClasses = selectedCourse 
    ? coursesWithClasses.find(c => c.id === selectedCourse)?.classes || []
    : [];

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedClass(null);
  };

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => setIsAddModalVisible(true);
  const handleCloseAddModal = () => setIsAddModalVisible(false);
  const handleAddStudent = () => {
    setIsAddModalVisible(false);
    navigate('/students/new');
  };

  const handleEdit = (id) => {
    navigate(`/students/edit/${id}`);
  };

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/users/${studentToDelete}`);
      message.success('Aluno excluído com sucesso!');
      setStudents(prev => prev.filter(s => s.id !== studentToDelete));
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error('Erro ao excluir aluno');
    }
  };

  return (
    <StudentsScreen
      students={filteredStudents}
      loading={loading}
      showInactive={showInactive}
      onToggleInactive={setShowInactive}
      onSearch={handleSearch}
      courses={coursesWithClasses}
      availableClasses={availableClasses}
      selectedCourse={selectedCourse}
      selectedClass={selectedClass}
      onCourseChange={handleCourseChange}
      onClassChange={setSelectedClass}
      onAdd={handleAdd}
      isAddModalVisible={isAddModalVisible}
      onCloseAddModal={handleCloseAddModal}
      onAddStudent={handleAddStudent}
      onEdit={handleEdit}
      onDelete={handleDelete}
      isDeleteModalVisible={isDeleteModalVisible}
      onCloseDeleteModal={() => setIsDeleteModalVisible(false)}
      onConfirmDelete={confirmDelete}
    />
  );
};

export default StudentsContainer;
