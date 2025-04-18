import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { getProjects } from '../services/storageService';

const ProjectsListScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();

    // Add listener for when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadProjects();
    });

    return unsubscribe;
  }, [navigation]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const projectsList = await getProjects();
      // Sort projects by creation date (newest first)
      projectsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProjects(projectsList);
    } catch (error) {
      console.error('Error loading projects:', error);
      Alert.alert('Hata', 'Projeler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (project) => {
    const completedTasks = project.result.taskList.filter(task => task.completed).length;
    const totalTasks = project.result.taskList.length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const renderProjectItem = ({ item }) => {
    const progressPercentage = getProgressPercentage(item);
    const truncatedIdea = item.projectIdea.length > 60 
      ? item.projectIdea.substring(0, 60) + '...' 
      : item.projectIdea;
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Results', { project: item })}
      >
        <Card containerStyle={styles.projectCard}>
          <View style={styles.projectHeader}>
            <Text style={styles.projectTitle}>{truncatedIdea}</Text>
            <Text style={styles.projectDate}>
              {new Date(item.createdAt).toLocaleDateString('tr-TR')}
            </Text>
          </View>
          
          <View style={styles.projectDetails}>
            <Text style={styles.skillLevel}>Seviye: {item.skillLevel}</Text>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>{progressPercentage}%</Text>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${progressPercentage}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
          
          <View style={styles.taskInfo}>
            <Icon name="check-circle" type="feather" size={16} color="#4a6da7" />
            <Text style={styles.taskCount}>
              {item.result.taskList.filter(task => task.completed).length}/{item.result.taskList.length} görev tamamlandı
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {projects.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="folder" type="feather" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Henüz hiç proje yok</Text>
          <TouchableOpacity
            style={styles.newProjectButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.newProjectButtonText}>Yeni Proje Oluştur</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={projects}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 12,
  },
  projectCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  projectHeader: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  projectDate: {
    fontSize: 12,
    color: '#888',
  },
  projectDetails: {
    marginBottom: 12,
  },
  skillLevel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a6da7',
    width: 40,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4a6da7',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    marginBottom: 24,
  },
  newProjectButton: {
    backgroundColor: '#4a6da7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  newProjectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectsListScreen;
