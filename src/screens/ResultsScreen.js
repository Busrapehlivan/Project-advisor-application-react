import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { CheckBox, Button, Card, Icon } from '@rneui/themed';
import { saveProject, updateTaskStatus } from '../services/storageService';

const ResultsScreen = ({ route, navigation }) => {
  const { project } = route.params;
  const [currentProject, setCurrentProject] = useState(project);
  const [activeTab, setActiveTab] = useState('evaluation');

  useEffect(() => {
    // Save the project when the component mounts
    saveProjectToStorage();
  }, []);

  const saveProjectToStorage = async () => {
    try {
      await saveProject(project);
    } catch (error) {
      console.error('Error saving project:', error);
      Alert.alert('Hata', 'Proje kaydedilirken bir hata oluştu.');
    }
  };

  const handleTaskToggle = async (taskId) => {
    try {
      const taskIndex = currentProject.result.taskList.findIndex(
        task => task.id === taskId
      );
      
      if (taskIndex !== -1) {
        const newCompleted = !currentProject.result.taskList[taskIndex].completed;
        
        // Update in local state
        const updatedTasks = [...currentProject.result.taskList];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          completed: newCompleted
        };
        
        const updatedProject = {
          ...currentProject,
          result: {
            ...currentProject.result,
            taskList: updatedTasks
          }
        };
        
        setCurrentProject(updatedProject);
        
        // Update in storage
        await updateTaskStatus(currentProject.id, taskId, newCompleted);
      }
    } catch (error) {
      console.error('Error toggling task:', error);
      Alert.alert('Hata', 'Görev durumu güncellenirken bir hata oluştu.');
    }
  };

  const getCompletedTasksCount = () => {
    return currentProject.result.taskList.filter(task => task.completed).length;
  };

  const getTotalTasksCount = () => {
    return currentProject.result.taskList.length;
  };

  const getProgressPercentage = () => {
    const completed = getCompletedTasksCount();
    const total = getTotalTasksCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const renderEvaluation = () => (
    <View style={styles.tabContent}>
      <Card containerStyle={styles.card}>
        <Card.Title>Proje Değerlendirmesi</Card.Title>
        <Card.Divider />
        <Text style={styles.evaluationText}>{currentProject.result.evaluation}</Text>
      </Card>
      
      <Card containerStyle={styles.card}>
        <Card.Title>Öneriler</Card.Title>
        <Card.Divider />
        <Text style={styles.recommendationText}>{currentProject.result.recommendations}</Text>
      </Card>
    </View>
  );

  const renderTasks = () => (
    <View style={styles.tabContent}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          İlerleme: {getCompletedTasksCount()}/{getTotalTasksCount()} ({getProgressPercentage()}%)
        </Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${getProgressPercentage()}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.tasksContainer}>
        {currentProject.result.taskList.map((task) => (
          <CheckBox
            key={task.id}
            title={task.task}
            checked={task.completed}
            onPress={() => handleTaskToggle(task.id)}
            containerStyle={styles.checkboxContainer}
            textStyle={[
              styles.checkboxText,
              task.completed && styles.completedTaskText
            ]}
            checkedColor="#4a6da7"
          />
        ))}
      </View>
    </View>
  );

  const renderFlowDiagram = () => (
    <View style={styles.tabContent}>
      <Card containerStyle={styles.card}>
        <Card.Title>Proje Akış Diyagramı</Card.Title>
        <Card.Divider />
        <Text style={styles.flowDiagramText}>{currentProject.result.flowDiagram}</Text>
      </Card>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.projectInfoContainer}>
        <Text style={styles.projectTitle}>{currentProject.projectIdea.substring(0, 50)}...</Text>
        <Text style={styles.projectMeta}>
          Seviye: {currentProject.skillLevel} • 
          {new Date(currentProject.createdAt).toLocaleDateString('tr-TR')}
        </Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'evaluation' && styles.activeTab]}
          onPress={() => setActiveTab('evaluation')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'evaluation' && styles.activeTabText
            ]}
          >
            Değerlendirme
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
          onPress={() => setActiveTab('tasks')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'tasks' && styles.activeTabText
            ]}
          >
            Görevler
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'flow' && styles.activeTab]}
          onPress={() => setActiveTab('flow')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'flow' && styles.activeTabText
            ]}
          >
            Akış Diyagramı
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'evaluation' && renderEvaluation()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'flow' && renderFlowDiagram()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  projectInfoContainer: {
    backgroundColor: '#4a6da7',
    padding: 16,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  projectMeta: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a6da7',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4a6da7',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  evaluationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  recommendationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  flowDiagramText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4a6da7',
  },
  tasksContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  checkboxContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
    marginLeft: 0,
    marginRight: 0,
    marginVertical: 0,
  },
  checkboxText: {
    fontWeight: 'normal',
    fontSize: 15,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default ResultsScreen;
