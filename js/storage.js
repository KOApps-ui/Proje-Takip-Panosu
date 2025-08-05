// Storage Service for Local Data Management
class StorageService {
    constructor() {
        this.storageKey = 'kanban-project-tracker';
    }

    // Generic methods
    saveData(key, data) {
        try {
            const existingData = this.getAllData();
            existingData[key] = data;
            localStorage.setItem(this.storageKey, JSON.stringify(existingData));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    }

    getData(key) {
        try {
            const allData = this.getAllData();
            return allData[key] || [];
        } catch (error) {
            console.error('Error loading data:', error);
            return [];
        }
    }

    getAllData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Error loading all data:', error);
            return {};
        }
    }

    clearAllData() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    exportData() {
        try {
            const data = this.getAllData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `kanban-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Error exporting data:', error);
            return false;
        }
    }

    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    localStorage.setItem(this.storageKey, JSON.stringify(data));
                    resolve(data);
                } catch (error) {
                    reject(new Error('Invalid JSON file'));
                }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsText(file);
        });
    }

    // Member methods
    getMembers() {
        return this.getData('members');
    }

    saveMember(member) {
        const members = this.getMembers();
        const existingIndex = members.findIndex(m => m.id === member.id);
        
        if (existingIndex >= 0) {
            members[existingIndex] = member;
        } else {
            members.push(member);
        }
        
        return this.saveData('members', members);
    }

    deleteMember(id) {
        const members = this.getMembers().filter(m => m.id !== id);
        return this.saveData('members', members);
    }

    // Project methods
    getProjects() {
        return this.getData('projects');
    }

    saveProject(project) {
        const projects = this.getProjects();
        const existingIndex = projects.findIndex(p => p.id === project.id);
        
        if (existingIndex >= 0) {
            projects[existingIndex] = project;
        } else {
            projects.push(project);
        }
        
        return this.saveData('projects', projects);
    }

    deleteProject(id) {
        const projects = this.getProjects().filter(p => p.id !== id);
        return this.saveData('projects', projects);
    }

    // Task methods
    getTasks() {
        return this.getData('tasks');
    }

    saveTask(task) {
        const tasks = this.getTasks();
        const existingIndex = tasks.findIndex(t => t.id === task.id);
        
        if (existingIndex >= 0) {
            tasks[existingIndex] = task;
        } else {
            tasks.push(task);
        }
        
        return this.saveData('tasks', tasks);
    }

    deleteTask(id) {
        const tasks = this.getTasks().filter(t => t.id !== id);
        return this.saveData('tasks', tasks);
    }

    // Column status methods
    getColumnStatuses() {
        return this.getData('columnStatuses') || ['Yapılacaklar', 'Devam-Ediyor', 'Beklemede', 'Tamamlanan'];
    }

    saveColumnStatuses(statuses) {
        return this.saveData('columnStatuses', statuses);
    }
}

// Initialize storage service
window.storageService = new StorageService();