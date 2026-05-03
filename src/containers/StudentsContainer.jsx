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
  const [studentToActOn, setStudentToActOn] = useState(null);
  const [actionType, setActionType] = useState('inactivate');

  const handleActionClick = (id, type) => {
    setStudentToActOn(id);
    setActionType(type);
    setIsDeleteModalVisible(true);
  };

  const confirmAction = async () => {
    try {
      if (actionType === 'delete') {
        await api.delete(`/api/users/${studentToActOn}`);
        message.success('Aluno excluído permanentemente!');
      } else {
        await api.put(`/api/users/${studentToActOn}/inativar`);
        message.success('Aluno inativado com sucesso!');
      }
      // Data is updated locally below without needing to re-fetch
      // re-fetch data or we can just reload the page/component
      // The best is to extract fetchData into a useCallback, but it's inside useEffect. 
      // Let's just update local state
      setStudents(prev => prev.map(s => {
        if(s.id === studentToActOn && actionType === 'inactivate') return {...s, ativo: false};
        return s;
      }).filter(s => actionType === 'delete' ? s.id !== studentToActOn : true));
      
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error(error);
      const backendMessage = error.response?.data?.message;
      message.error(typeof backendMessage === 'string' ? backendMessage : `Erro ao ${actionType === 'delete' ? 'excluir' : 'inativar'} aluno`);
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
      onActionClick={handleActionClick}
      isDeleteModalVisible={isDeleteModalVisible}
      onCloseDeleteModal={() => setIsDeleteModalVisible(false)}
      onConfirmAction={confirmAction}
      actionType={actionType}
    />
  );
};

export default StudentsContainer;
