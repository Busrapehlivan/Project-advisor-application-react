import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { Input, Button } from '@rneui/themed';
import { getProjects } from '../services/storageService';
import { evaluateProjectIdea } from '../services/geminiService';

const skillLevels = ['Başlangıç', 'Orta', 'İleri'];

const HomeScreen = ({ navigation }) => {
  const [projectIdea, setProjectIdea] = useState('');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('Başlangıç');
  const [loading, setLoading] = useState(false);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    // Load project count on mount
    loadProjectCount();
  }, []);

  const loadProjectCount = async () => {
    const projects = await getProjects();
    setProjectCount(projects.length);
  };

  const handleSubmit = async () => {
    if (!projectIdea.trim()) {
      Alert.alert('Hata', 'Lütfen bir proje fikri girin');
      return;
    }

    setLoading(true);
    try {
      const result = await evaluateProjectIdea(projectIdea, selectedSkillLevel);
      
      // Create a new project object
      const newProject = {
        id: Date.now().toString(),
        projectIdea,
        skillLevel: selectedSkillLevel,
        createdAt: new Date().toISOString(),
        result
      };
      
      // Navigate to results screen with the new project
      navigation.navigate('Results', { project: newProject });
    } catch (error) {
      console.error('Error evaluating project:', error);
      Alert.alert(
        'Hata',
        'Proje değerlendirmesi sırasında bir hata oluştu. Lütfen tekrar deneyin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Proje Danışmanı</Text>
        <Text style={styles.subtitle}>
          Proje fikrinizi girin ve yapay zeka ile değerlendirin
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Proje Fikriniz</Text>
          <Input
            placeholder="Proje fikrinizi detaylı bir şekilde açıklayın..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={projectIdea}
            onChangeText={setProjectIdea}
            inputContainerStyle={styles.textInputContainer}
            inputStyle={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Seviyeniz</Text>
          <View style={styles.skillLevelContainer}>
            {skillLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.skillLevelButton,
                  selectedSkillLevel === level && styles.selectedSkillLevel,
                ]}
                onPress={() => setSelectedSkillLevel(level)}
              >
                <Text
                  style={[
                    styles.skillLevelText,
                    selectedSkillLevel === level && styles.selectedSkillLevelText,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Değerlendir"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || !projectIdea.trim()}
          buttonStyle={styles.submitButton}
          titleStyle={styles.submitButtonText}
        />

        {projectCount > 0 && (
          <TouchableOpacity
            style={styles.projectsButton}
            onPress={() => navigation.navigate('ProjectsList')}
          >
            <Text style={styles.projectsButtonText}>
              Projelerim ({projectCount})
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a6da7',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  textInput: {
    minHeight: 100,
  },
  skillLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillLevelButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedSkillLevel: {
    backgroundColor: '#4a6da7',
    borderColor: '#4a6da7',
  },
  skillLevelText: {
    color: '#333',
    fontWeight: '500',
  },
  selectedSkillLevelText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#4a6da7',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectsButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  projectsButtonText: {
    color: '#4a6da7',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;
