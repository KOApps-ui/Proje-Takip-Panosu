// Main Application Class with Modern Kanban Board
class ProjectTrackerApp {
    constructor() {
        this.currentView = 'kanban';
        this.members = [];
        this.projects = [];
        this.tasks = [];
        this.draggedElement = null;
        this.draggedMember = null;
        this.columnStatuses = ['Yapılacaklar', 'Devam-Ediyor', 'Beklemede', 'Tamamlanan'];
        this.init();
    }

    init() {
        this.loadData();
        this.render();
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    loadData() {
        this.members = window.storageService.getMembers();
        this.projects = window.storageService.getProjects();
        this.tasks = window.storageService.getTasks();
        this.columnStatuses = window.storageService.getColumnStatuses();
    }

    refreshData() {
        this.loadData();
        this.render();
        this.setupDragAndDrop();
        window.toastManager.show('Veriler güncellendi', 'success');
    }

    setupEventListeners() {
        // Theme toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle')) {
                window.themeManager.toggleTheme();
            }
        });

        // Tab navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-tab]')) {
                const tab = e.target.closest('[data-tab]').dataset.tab;
                this.switchTab(tab);
            }
        });

        // Export/Import buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('#export-data')) {
                this.exportData();
            }
            if (e.target.closest('#import-data')) {
                this.importData();
            }
            if (e.target.closest('#clear-data')) {
                this.clearData();
            }
        });
    }

    switchTab(tab) {
        this.currentView = tab;
        
        // Update tab buttons
        document.querySelectorAll('[data-tab]').forEach(btn => {
            btn.classList.remove('bg-primary', 'text-primary-foreground');
            btn.classList.add('bg-muted', 'text-muted-foreground');
        });
        
        const activeTab = document.querySelector(`[data-tab="${tab}"]`);
        if (activeTab) {
            activeTab.classList.remove('bg-muted', 'text-muted-foreground');
            activeTab.classList.add('bg-primary', 'text-primary-foreground');
        }
        
        this.render();
        if (tab === 'kanban') {
            setTimeout(() => this.setupDragAndDrop(), 100);
        }
    }

    render() {
        const app = document.getElementById('app');
        if (!app) return;

        app.innerHTML = this.getMainHTML();
    }

    getMainHTML() {
        return `
            ${this.getHeaderHTML()}
            ${this.getDashboardHTML()}
            ${this.getTabsHTML()}
            ${this.getFooterHTML()}
        `;
    }

    getHeaderHTML() {
        const stats = this.getStatistics();
        
        return `
            <div class="flex flex-col mb-4 p-4">
                <!-- Top row with title, status, and statistics -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-4 mb-4 relative">
                    <!-- Left: Compact General Status Section -->
                    <div class="bg-card border rounded-lg p-2 lg:w-1/5">
                        <h3 class="text-sm font-semibold mb-1 flex items-center">
                            <i class="fas fa-chart-line mr-1 text-xs"></i>Genel Durum
                        </h3>
                        <div class="space-y-1">
                            <div class="flex justify-between text-xs">
                                <span>Proje</span>
                                <span>${stats.projectCompletion}%</span>
                            </div>
                            <div class="w-full bg-muted rounded-full h-1">
                                <div class="bg-green-500 h-1 rounded-full transition-all duration-300" 
                                     style="width: ${stats.projectCompletion}%"></div>
                            </div>
                            <div class="flex justify-between text-xs">
                                <span>Görev</span>
                                <span>${stats.taskCompletion}%</span>
                            </div>
                            <div class="w-full bg-muted rounded-full h-1">
                                <div class="bg-blue-500 h-1 rounded-full transition-all duration-300" 
                                     style="width: ${stats.taskCompletion}%"></div>
                            </div>
                            <div class="flex justify-between text-xs">
                                <span>Yüksek Önc.</span>
                                <span>${stats.highPriorityTasks}</span>
                            </div>
                            <div class="w-full bg-muted rounded-full h-1">
                                <div class="bg-red-500 h-1 rounded-full transition-all duration-300" 
                                     style="width: ${Math.min((stats.highPriorityTasks / Math.max(stats.totalTasks, 1)) * 100, 100)}%"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Center: Title (Screen Centered) -->
                    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                        <h1 class="text-3xl font-bold">Proje Takip Panosu</h1>
                        <p class="text-muted-foreground">Projelerinizi sürükleyip bırakarak yönetin</p>
                    </div>

                    <!-- Right: Ultra Compact Statistics Cards -->
                    <div class="grid grid-cols-3 gap-1 lg:w-1/3 ml-auto">
                        <div class="bg-card border rounded-lg p-1">
                            <div class="text-center">
                                <p class="text-xs text-muted-foreground">Proje</p>
                                <p class="text-lg font-bold">${stats.totalProjects}</p>
                                <p class="text-xs text-muted-foreground">
                                    ${stats.activeProjects}A / ${stats.completedProjects}T
                                </p>
                            </div>
                        </div>

                        <div class="bg-card border rounded-lg p-1">
                            <div class="text-center">
                                <p class="text-xs text-muted-foreground">Görev</p>
                                <p class="text-lg font-bold">${stats.totalTasks}</p>
                                <p class="text-xs text-muted-foreground">
                                    ${stats.completedTasks}T / ${stats.inProgressTasks}D
                                </p>
                            </div>
                        </div>

                        <div class="bg-card border rounded-lg p-1">
                            <div class="text-center">
                                <p class="text-xs text-muted-foreground">Gecikmiş</p>
                                <p class="text-lg font-bold text-red-500">${stats.overdueTasks}</p>
                                <p class="text-xs text-muted-foreground">
                                    Geçmiş
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom row with perfectly centered action buttons -->
                <div class="flex justify-center items-center gap-3 mt-12">
                    <button id="export-data" class="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors">
                        <i class="fas fa-download mr-1"></i>Dışa Aktar
                    </button>
                    <input type="file" id="import-file" accept=".json" class="hidden">
                    <button id="import-data" class="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors">
                        <i class="fas fa-upload mr-1"></i>İçe Aktar
                    </button>
                    <button id="clear-data" class="px-3 py-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-md text-sm font-medium transition-colors">
                        <i class="fas fa-trash mr-1"></i>Temizle
                    </button>
                    <button id="theme-toggle" class="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium transition-colors">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getDashboardHTML() {
        // Statistics and general status are now in the header for better space utilization
        return '';
    }

    getTabsHTML() {
        return `
            <div class="flex-1 p-6">
                <div class="bg-card border rounded-lg p-6 h-full">
                    <div class="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
                        <button data-tab="kanban" class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${this.currentView === 'kanban' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
                            <i class="fas fa-columns mr-2"></i>Kanban Board
                        </button>
                        <button data-tab="tasks" class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${this.currentView === 'tasks' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
                            <i class="fas fa-tasks mr-2"></i>Görevler
                        </button>
                        <button data-tab="members" class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${this.currentView === 'members' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}">
                            <i class="fas fa-users mr-2"></i>Üyeler
                        </button>
                    </div>

                    <div class="tab-content">
                        ${this.currentView === 'kanban' ? this.getKanbanHTML() : ''}
                        ${this.currentView === 'tasks' ? this.getTasksHTML() : ''}
                        ${this.currentView === 'members' ? this.getMembersHTML() : ''}
                    </div>
                </div>
            </div>
        `;
    }

    getFooterHTML() {
        return `
            <footer class="footer border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div class="container mx-auto px-4 py-3">
                    <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <div class="text-sm text-muted-foreground footer-content select-none">
                            © 2024 Proje Takip Panosu by Kemaleddin ÖZÇELİK
                        </div>
                        <div class="flex items-center gap-4 text-xs text-muted-foreground footer-content select-none">
                            <span>Built with HTML5</span>
                            <span>•</span>
                            <span>Tailwind CSS</span>
                            <span>•</span>
                            <span>JavaScript</span>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    getKanbanHTML() {
        return `
            <div class="flex gap-4 h-full">
                <!-- Members Panel -->
                <div class="w-48 flex-shrink-0">
                    <div class="bg-muted rounded-lg p-3">
                        <div class="flex justify-between items-center mb-3">
                            <h3 class="font-semibold text-sm">Üyeler</h3>
                            <button onclick="app.showMemberForm()" class="text-primary hover:text-primary/80 text-sm">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="space-y-2" id="members-list">
                            ${this.members.map(member => this.getMemberCard(member)).join('')}
                        </div>
                    </div>
                </div>

                <!-- Kanban Board -->
                <div class="flex-1">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold">Projeler</h2>
                        <button onclick="app.showProjectForm()" class="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">
                            <i class="fas fa-plus mr-1"></i>Yeni Proje
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <!-- Yapılacaklar Column -->
                        <div class="bg-muted rounded-lg p-3 kanban-column status-pending" data-status="pending" ondrop="app.handleDrop(event)" ondragover="app.handleDragOver(event)" ondragleave="app.handleDragLeave(event)">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="font-semibold text-yellow-700 text-sm">Yapılacaklar</h3>
                                <div class="flex items-center gap-1">
                                    <span class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                        ${this.projects.filter(p => p.status === 'pending').length}
                                    </span>
                                    <button onclick="app.showProjectForm(null, 'pending')" class="text-primary hover:text-primary/80 text-xs">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2 min-h-[400px]" id="pending-projects">
                                ${this.projects.filter(p => p.status === 'pending').map(project => this.getProjectCard(project)).join('')}
                            </div>
                        </div>

                        <!-- Devam Ediyor Column -->
                        <div class="bg-muted rounded-lg p-3 kanban-column status-active" data-status="active" ondrop="app.handleDrop(event)" ondragover="app.handleDragOver(event)" ondragleave="app.handleDragLeave(event)">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="font-semibold text-blue-700 text-sm">Devam Ediyor</h3>
                                <div class="flex items-center gap-1">
                                    <span class="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        ${this.projects.filter(p => p.status === 'active').length}
                                    </span>
                                    <button onclick="app.showProjectForm(null, 'active')" class="text-primary hover:text-primary/80 text-xs">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2 min-h-[400px]" id="active-projects">
                                ${this.projects.filter(p => p.status === 'active').map(project => this.getProjectCard(project)).join('')}
                            </div>
                        </div>

                        <!-- Beklemede Column -->
                        <div class="bg-muted rounded-lg p-3 kanban-column status-waiting" data-status="waiting" ondrop="app.handleDrop(event)" ondragover="app.handleDragOver(event)" ondragleave="app.handleDragLeave(event)">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="font-semibold text-orange-700 text-sm">Beklemede</h3>
                                <div class="flex items-center gap-1">
                                    <span class="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs">
                                        ${this.projects.filter(p => p.status === 'waiting').length}
                                    </span>
                                    <button onclick="app.showProjectForm(null, 'waiting')" class="text-primary hover:text-primary/80 text-xs">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2 min-h-[400px]" id="waiting-projects">
                                ${this.projects.filter(p => p.status === 'waiting').map(project => this.getProjectCard(project)).join('')}
                            </div>
                        </div>

                        <!-- Tamamlandı Column -->
                        <div class="bg-muted rounded-lg p-3 kanban-column status-completed" data-status="completed" ondrop="app.handleDrop(event)" ondragover="app.handleDragOver(event)" ondragleave="app.handleDragLeave(event)">
                            <div class="flex items-center justify-between mb-3">
                                <h3 class="font-semibold text-green-700 text-sm">Tamamlandı</h3>
                                <div class="flex items-center gap-1">
                                    <span class="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                                        ${this.projects.filter(p => p.status === 'completed').length}
                                    </span>
                                    <button onclick="app.showProjectForm(null, 'completed')" class="text-primary hover:text-primary/80 text-xs">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="space-y-2 min-h-[400px]" id="completed-projects">
                                ${this.projects.filter(p => p.status === 'completed').map(project => this.getProjectCard(project)).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProjectCard(project) {
        const assignedMembers = this.members.filter(m => project.assignedMemberIds?.includes(m.id));
        const projectTasks = this.tasks.filter(t => t.projectId === project.id);
        const cardColor = project.color || '#3b82f6';
        
        return `
            <div class="border-l-4 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow relative project-card ${project.status ? 'status-' + project.status : ''}" 
                 style="background-color: ${cardColor}20; border-left-color: ${cardColor};"
                 draggable="true" 
                 ondragstart="app.handleDragStart(event, '${project.id}')"
                 ondragend="app.handleDragEnd(event)"
                 ondrop="app.handleMemberDropOnProject(event, '${project.id}')"
                 ondragover="app.handleMemberDragOver(event)"
                 ondragleave="app.handleMemberDragLeave(event)"
                 data-project-id="${project.id}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <h4 class="font-semibold text-sm">${project.title || project.name}</h4>
                        ${project.description ? `<p class="text-muted-foreground text-xs mt-1">${project.description}</p>` : ''}
                    </div>
                    <div class="flex items-center space-x-1">
                        <button onclick="app.showProjectForm('${project.id}')" class="text-muted-foreground hover:text-foreground text-xs">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteProject('${project.id}')" class="text-destructive hover:text-destructive/90 text-xs">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="flex flex-wrap gap-1 mb-2">
                    ${assignedMembers.map(member => `
                        <span class="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs flex items-center">
                            <i class="fas fa-user mr-1"></i>${member.name}
                            <button onclick="app.removeMemberFromProject('${project.id}', '${member.id}')" class="ml-1 hover:text-destructive">
                                <i class="fas fa-times text-xs"></i>
                            </button>
                        </span>
                    `).join('')}
                </div>
                
                <div class="flex justify-between items-center text-xs text-muted-foreground">
                    <span><i class="fas fa-tasks mr-1"></i>${projectTasks.length}</span>
                    <span><i class="fas fa-calendar mr-1"></i>${window.utils.formatDate(project.updatedAt)}</span>
                </div>
                
                <div class="mt-2 pt-2 border-t">
                    <button onclick="app.showTaskForm('${project.id}')" class="text-xs text-primary hover:text-primary/80">
                        <i class="fas fa-plus mr-1"></i>Görev Ekle
                    </button>
                </div>
                
                <!-- Drop zone indicator -->
                <div class="absolute inset-0 border-2 border-dashed border-primary rounded-lg opacity-0 hover:opacity-20 transition-opacity pointer-events-none drop-indicator"></div>
            </div>
        `;
    }

    getMemberCard(member) {
        const memberProjects = this.projects.filter(p => p.assignedMemberIds?.includes(member.id));
        const memberTasks = this.tasks.filter(t => t.assignedMemberId === member.id);
        const memberColor = member.color || '#3b82f6'; // Default color if not set
        
        return `
            <div class="bg-card border rounded-lg p-3 cursor-move hover:shadow-md transition-shadow member-card"
                 draggable="true"
                 ondragstart="app.handleMemberDragStart(event, '${member.id}')"
                 ondragend="app.handleMemberDragEnd(event)"
                 data-member-id="${member.id}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style="background-color: ${memberColor}">
                            ${member.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h4 class="font-medium text-sm">${member.name}</h4>
                        </div>
                    </div>
                    <div class="flex items-center space-x-1">
                        <button onclick="app.showMemberForm('${member.id}')" class="text-muted-foreground hover:text-foreground text-xs">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteMember('${member.id}')" class="text-destructive hover:text-destructive/90 text-xs">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="flex justify-between items-center text-xs text-muted-foreground">
                    <span><i class="fas fa-folder mr-1"></i>${memberProjects.length}</span>
                    <span><i class="fas fa-tasks mr-1"></i>${memberTasks.length}</span>
                </div>
            </div>
        `;
    }

    getTasksHTML() {
        return `
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-semibold">Görevler</h2>
                    <button onclick="app.showTaskForm()" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        <i class="fas fa-plus mr-2"></i>Yeni Görev
                    </button>
                </div>
                <div class="grid gap-4">
                    ${this.tasks.map(task => this.getTaskCard(task)).join('')}
                </div>
            </div>
        `;
    }

    getTaskCard(task) {
        const project = this.projects.find(p => p.id === task.projectId);
        const assignedMember = this.members.find(m => m.id === task.assignedMemberId);
        
        return `
            <div class="bg-card border rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex-1">
                        <h4 class="font-medium">${task.title}</h4>
                        <p class="text-sm text-muted-foreground">${task.description || ''}</p>
                    </div>
                    <div class="flex items-center space-x-1">
                        <button onclick="app.showTaskForm('${task.id}')" class="text-muted-foreground hover:text-foreground text-xs">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteTask('${task.id}')" class="text-destructive hover:text-destructive/90 text-xs">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Proje: ${project?.title || 'Belirsiz'}</span>
                    <span>Atanan: ${assignedMember?.name || 'Belirsiz'}</span>
                </div>
            </div>
        `;
    }

    getMembersHTML() {
        return `
            <div class="space-y-4 border-l-4 border-blue-500 pl-4 bg-blue-50/5 rounded-r-lg">
                <div class="flex justify-between items-center bg-blue-100/10 p-3 rounded-lg">
                    <div class="flex items-center gap-3">
                        <h2 class="text-2xl font-bold text-blue-700 dark:text-blue-300">ÜYELER</h2>
                        <span class="bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                            ${this.members.length} üye
                        </span>
                    </div>
                    <button onclick="app.showMemberForm()" class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                        <i class="fas fa-plus mr-2"></i>Yeni Üye
                    </button>
                </div>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    ${this.members.map(member => this.getMemberDetailCard(member)).join('')}
                </div>
            </div>
        `;
    }

    getMemberDetailCard(member) {
        const memberProjects = this.projects.filter(p => p.assignedMemberIds?.includes(member.id));
        const memberTasks = this.tasks.filter(t => t.assignedMemberId === member.id);
        
        return `
            <div class="bg-card border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h4 class="font-medium">${member.name}</h4>
                        <p class="text-sm text-muted-foreground">${member.email || ''}</p>
                    </div>
                    <div class="flex items-center space-x-1">
                        <button onclick="app.showMemberForm('${member.id}')" class="text-muted-foreground hover:text-foreground text-xs">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="app.deleteMember('${member.id}')" class="text-destructive hover:text-destructive/90 text-xs">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span>Projeler:</span>
                        <span class="font-medium">${memberProjects.length}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Görevler:</span>
                        <span class="font-medium">${memberTasks.length}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getStatistics() {
        const totalProjects = this.projects.length;
        const activeProjects = this.projects.filter(p => p.status === 'active').length;
        const completedProjects = this.projects.filter(p => p.status === 'completed').length;
        
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
        const inProgressTasks = this.tasks.filter(t => t.status === 'in-progress').length;
        
        const overdueTasks = this.tasks.filter(t => 
            t.dueDate && new Date() > new Date(t.dueDate) && t.status !== 'completed'
        ).length;
        
        const highPriorityTasks = this.tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
        
        const projectCompletion = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;
        const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        return {
            totalProjects,
            activeProjects,
            completedProjects,
            totalTasks,
            completedTasks,
            inProgressTasks,
            overdueTasks,
            highPriorityTasks,
            totalMembers: this.members.length,
            projectCompletion,
            taskCompletion
        };
    }

    // Form Methods
    showProjectForm(projectId = null, defaultStatus = null) {
        const project = projectId ? this.projects.find(p => p.id === projectId) : null;
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
        
        const formHTML = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Proje Adı</label>
                    <input type="text" id="project-title" value="${project?.title || ''}" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Açıklama</label>
                    <textarea id="project-description" rows="3" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">${project?.description || ''}</textarea>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Durum</label>
                    <select id="project-status" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                        <option value="pending" ${project?.status === 'pending' || defaultStatus === 'pending' ? 'selected' : ''}>Yapılacaklar</option>
                        <option value="active" ${project?.status === 'active' || defaultStatus === 'active' ? 'selected' : ''}>Devam Ediyor</option>
                        <option value="waiting" ${project?.status === 'waiting' || defaultStatus === 'waiting' ? 'selected' : ''}>Beklemede</option>
                        <option value="completed" ${project?.status === 'completed' || defaultStatus === 'completed' ? 'selected' : ''}>Tamamlandı</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Atanan Üyeler</label>
                    <div class="space-y-2 max-h-32 overflow-y-auto border border-input rounded-md p-2">
                        ${this.members.length === 0 ? 
                            '<p class="text-sm text-muted-foreground">Henüz hiç üye eklenmemiş.</p>' :
                            this.members.map(member => `
                                <label class="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" id="member-${member.id}" 
                                           ${project?.assignedMemberIds?.includes(member.id) ? 'checked' : ''} 
                                           class="rounded border-input text-primary focus:ring-ring">
                                    <span class="text-sm">${member.name}</span>
                                </label>
                            `).join('')
                        }
                    </div>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Kart Rengi</label>
                    <div class="flex gap-2 flex-wrap">
                        ${colors.map(color => `
                            <button type="button" onclick="app.selectProjectColor('${color}')" class="w-8 h-8 rounded-full border-2 ${project?.color === color ? 'border-primary' : 'border-gray-300'} hover:border-primary transition-colors" style="background-color: ${color}"></button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="project-color" value="${project?.color || colors[0]}">
                </div>
            </div>
        `;
        
        window.modalManager.show(formHTML, {
            title: projectId ? 'Proje Düzenle' : 'Yeni Proje',
            showSubmitButton: true,
            submitButtonText: projectId ? 'Güncelle' : 'Ekle',
            onSubmit: () => this.saveProject(projectId)
        });
    }

    saveProject(projectId = null) {
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const status = document.getElementById('project-status').value;
        const color = document.getElementById('project-color').value;
        
        // Atanan üyeleri topla
        const assignedMemberIds = [];
        this.members.forEach(member => {
            const checkbox = document.getElementById(`member-${member.id}`);
            if (checkbox && checkbox.checked) {
                assignedMemberIds.push(member.id);
            }
        });
        
        if (!title) {
            window.toastManager.show('Proje adı zorunludur', 'error');
            return;
        }
        
        const project = {
            id: projectId || window.utils.generateId(),
            title,
            description,
            status,
            color,
            assignedMemberIds,
            createdAt: projectId ? this.projects.find(p => p.id === projectId)?.createdAt : new Date(),
            updatedAt: new Date()
        };
        
        if (window.storageService.saveProject(project)) {
            window.toastManager.show('Proje kaydedildi', 'success');
            window.modalManager.close();
            this.refreshData();
        } else {
            window.toastManager.show('Proje kaydedilemedi', 'error');
        }
    }

  selectProjectColor(color) {
        document.getElementById('project-color').value = color;
        
        // Update visual selection
        document.querySelectorAll('[onclick^="app.selectProjectColor"]').forEach(btn => {
            btn.classList.remove('border-primary');
            btn.classList.add('border-gray-300');
        });
        
        event.target.classList.remove('border-gray-300');
        event.target.classList.add('border-primary');
    }

    selectMemberColor(color) {
        document.getElementById('member-color').value = color;
        
        // Update visual selection
        document.querySelectorAll('[onclick^="app.selectMemberColor"]').forEach(btn => {
            btn.classList.remove('border-primary');
            btn.classList.add('border-gray-300');
        });
        
        event.target.classList.remove('border-gray-300');
        event.target.classList.add('border-primary');
    }

    deleteProject(projectId) {
        if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
            if (window.storageService.deleteProject(projectId)) {
                // Also delete related tasks
                const relatedTasks = this.tasks.filter(t => t.projectId === projectId);
                relatedTasks.forEach(task => {
                    window.storageService.deleteTask(task.id);
                });
                
                window.toastManager.show('Proje silindi', 'success');
                this.refreshData();
            } else {
                window.toastManager.show('Proje silinemedi', 'error');
            }
        }
    }

    showMemberForm(memberId = null) {
        const member = memberId ? this.members.find(m => m.id === memberId) : null;
        const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#84cc16'];
        
        const formHTML = `
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-1">Ad Soyad</label>
                    <input type="text" id="member-name" value="${member?.name || ''}" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-1">Kişi Rengi</label>
                    <div class="flex gap-2 flex-wrap">
                        ${colors.map(color => `
                            <button type="button" onclick="app.selectMemberColor('${color}')" class="w-8 h-8 rounded-full border-2 ${member?.color === color ? 'border-primary' : 'border-gray-300'} hover:border-primary transition-colors" style="background-color: ${color}"></button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="member-color" value="${member?.color || colors[0]}">
                </div>
            </div>
        `;
        
        window.modalManager.show(formHTML, {
            title: memberId ? 'Üye Düzenle' : 'Yeni Üye',
            showSubmitButton: true,
            submitButtonText: memberId ? 'Güncelle' : 'Ekle',
            onSubmit: () => this.saveMember(memberId)
        });
    }

    saveMember(memberId = null) {
        const name = document.getElementById('member-name').value;
        const color = document.getElementById('member-color').value;
        
        if (!name) {
            window.toastManager.show('Ad soyad zorunludur', 'error');
            return;
        }
        
        const member = {
            id: memberId || window.utils.generateId(),
            name,
            color,
            createdAt: memberId ? this.members.find(m => m.id === memberId)?.createdAt : new Date(),
            updatedAt: new Date()
        };
        
        if (window.storageService.saveMember(member)) {
            window.toastManager.show('Üye kaydedildi', 'success');
            window.modalManager.close();
            this.refreshData();
        } else {
            window.toastManager.show('Üye kaydedilemedi', 'error');
        }
    }

    deleteMember(memberId) {
        if (confirm('Bu üyeyi silmek istediğinizden emin misiniz?')) {
            if (window.storageService.deleteMember(memberId)) {
                // Remove member from projects
                this.projects.forEach(project => {
                    if (project.assignedMemberIds?.includes(memberId)) {
                        project.assignedMemberIds = project.assignedMemberIds.filter(id => id !== memberId);
                        window.storageService.saveProject(project);
                    }
                });
                
                // Remove member from tasks
                this.tasks.forEach(task => {
                    if (task.assignedMemberId === memberId) {
                        task.assignedMemberId = null;
                        window.storageService.saveTask(task);
                    }
                });
                
                window.toastManager.show('Üye silindi', 'success');
                this.refreshData();
            } else {
                window.toastManager.show('Üye silinemedi', 'error');
            }
        }
    }

    showTaskForm(taskId = null, projectId = null) {
        const task = taskId ? this.tasks.find(t => t.id === taskId) : null;
        const formHTML = `
            <form onsubmit="return false;">
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Görev Adı</label>
                        <input type="text" id="task-title" value="${task?.title || ''}" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Açıklama</label>
                        <textarea id="task-description" rows="3" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">${task?.description || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Proje</label>
                        <select id="task-project" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="">Proje Seçin</option>
                            ${this.projects.map(project => `
                                <option value="${project.id}" ${task?.projectId === project.id || projectId === project.id ? 'selected' : ''}>${project.title}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Atanan Üye</label>
                        <select id="task-member" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="">Üye Seçin</option>
                            ${this.members.map(member => `
                                <option value="${member.id}" ${task?.assignedMemberId === member.id ? 'selected' : ''}>${member.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Öncelik</label>
                        <select id="task-priority" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="low" ${task?.priority === 'low' ? 'selected' : ''}>Düşük</option>
                            <option value="medium" ${task?.priority === 'medium' || !task?.priority ? 'selected' : ''}>Orta</option>
                            <option value="high" ${task?.priority === 'high' ? 'selected' : ''}>Yüksek</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Durum</label>
                        <select id="task-status" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="todo" ${task?.status === 'todo' ? 'selected' : ''}>Yapılacak</option>
                            <option value="in-progress" ${task?.status === 'in-progress' ? 'selected' : ''}>Yapılıyor</option>
                            <option value="completed" ${task?.status === 'completed' ? 'selected' : ''}>Tamamlandı</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Son Tarih</label>
                        <input type="date" id="task-due" value="${task?.dueDate ? task.dueDate.split('T')[0] : ''}" class="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring">
                    </div>
                </div>
            </form>
        `;
        
        window.modalManager.show(formHTML, {
            title: taskId ? 'Görev Düzenle' : 'Yeni Görev',
            showSubmitButton: true,
            submitButtonText: taskId ? 'Güncelle' : 'Ekle',
            onSubmit: () => this.saveTask(taskId)
        });
    }

    saveTask(taskId = null) {
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        const projectId = document.getElementById('task-project').value;
        const assignedMemberId = document.getElementById('task-member').value;
        const priority = document.getElementById('task-priority').value;
        const status = document.getElementById('task-status').value;
        const dueDate = document.getElementById('task-due').value;
        
        if (!title) {
            window.toastManager.show('Görev adı zorunludur', 'error');
            return;
        }
        
        const task = {
            id: taskId || window.utils.generateId(),
            title,
            description,
            projectId: projectId || null,
            assignedMemberId: assignedMemberId || null,
            priority,
            status,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            createdAt: taskId ? this.tasks.find(t => t.id === taskId)?.createdAt : new Date(),
            updatedAt: new Date()
        };
        
        if (window.storageService.saveTask(task)) {
            window.toastManager.show('Görev kaydedildi', 'success');
            window.modalManager.close();
            this.refreshData();
        } else {
            window.toastManager.show('Görev kaydedilemedi', 'error');
        }
    }

    deleteTask(taskId) {
        if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
            if (window.storageService.deleteTask(taskId)) {
                window.toastManager.show('Görev silindi', 'success');
                this.refreshData();
            } else {
                window.toastManager.show('Görev silinemedi', 'error');
            }
        }
    }

    removeMemberFromProject(projectId, memberId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project && project.assignedMemberIds) {
            project.assignedMemberIds = project.assignedMemberIds.filter(id => id !== memberId);
            if (window.storageService.saveProject(project)) {
                window.toastManager.show('Üye projeden çıkarıldı', 'success');
                this.refreshData();
            }
        }
    }

    // Drag and Drop Methods
    setupDragAndDrop() {
        // This method is called to set up drag and drop event listeners
        // The actual event handlers are attached directly in the HTML
    }

    handleDragStart(e, projectId) {
        this.draggedElement = projectId;
        e.dataTransfer.setData('text/plain', projectId);
        e.dataTransfer.setData('type', 'project');
        e.target.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedElement = null;
    }

    handleMemberDragStart(e, memberId) {
        this.draggedMember = memberId;
        e.dataTransfer.setData('text/plain', memberId);
        e.dataTransfer.setData('type', 'member');
        e.target.classList.add('dragging');
    }

    handleMemberDragEnd(e) {
        e.target.classList.remove('dragging');
        this.draggedMember = null;
    }

    handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const type = e.dataTransfer.getData('type');
        const targetColumn = e.target.closest('.kanban-column');
        
        if (type === 'project' && targetColumn) {
            const newStatus = targetColumn.dataset.status;
            const project = this.projects.find(p => p.id === data);
            
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                project.updatedAt = new Date();
                
                if (window.storageService.saveProject(project)) {
                    window.toastManager.show('Proje durumu güncellendi', 'success');
                    this.refreshData();
                }
            }
        }
        
        this.clearDragOverEffects();
    }

    handleDragOver(e) {
        e.preventDefault();
        const targetColumn = e.target.closest('.kanban-column');
        if (targetColumn) {
            targetColumn.classList.add('drag-over');
        }
        
        const targetProject = e.target.closest('.project-card');
        if (targetProject && this.draggedMember) {
            targetProject.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        this.clearDragOverEffects();
    }

    handleMemberDropOnProject(e, projectId) {
        e.preventDefault();
        e.stopPropagation();
        
        const memberId = this.draggedMember;
        if (!memberId) return;
        
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            if (!project.assignedMemberIds) {
                project.assignedMemberIds = [];
            }
            
            if (!project.assignedMemberIds.includes(memberId)) {
                project.assignedMemberIds.push(memberId);
                project.updatedAt = new Date();
                
                if (window.storageService.saveProject(project)) {
                    window.toastManager.show('Üye projeye eklendi', 'success');
                    this.refreshData();
                }
            }
        }
        
        this.clearDragOverEffects();
    }

    handleMemberDragOver(e) {
        e.preventDefault();
        const targetProject = e.target.closest('.project-card');
        if (targetProject) {
            targetProject.classList.add('drag-over');
        }
    }

    handleMemberDragLeave(e) {
        const targetProject = e.target.closest('.project-card');
        if (targetProject) {
            targetProject.classList.remove('drag-over');
        }
    }

    clearDragOverEffects() {
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    }

    // Data Management Methods
    exportData() {
        if (window.storageService.exportData()) {
            window.toastManager.show('Veriler dışa aktarıldı', 'success');
        } else {
            window.toastManager.show('Veriler dışa aktarılamadı', 'error');
        }
    }

    importData() {
        const input = document.getElementById('import-file');
        if (input) {
            input.click();
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    window.storageService.importData(file)
                        .then(() => {
                            window.toastManager.show('Veriler içe aktarıldı', 'success');
                            this.refreshData();
                        })
                        .catch(error => {
                            window.toastManager.show('Veriler içe aktarılamadı: ' + error.message, 'error');
                        });
                }
            };
        }
    }

    clearData() {
        if (confirm('Tüm verileri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
            if (window.storageService.clearAllData()) {
                window.toastManager.show('Tüm veriler silindi', 'success');
                this.refreshData();
            } else {
                window.toastManager.show('Veriler silinemedi', 'error');
            }
        }
    }
}

// Initialize the application
window.app = new ProjectTrackerApp();