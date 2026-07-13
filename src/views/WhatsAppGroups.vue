<template>
  <div class="whatsapp-groups-page">
    <header class="page-header">
      <button class="go-back" type="button" @click="goBack">
        <span class="back-chevron"></span>
        <span>Go back</span>
      </button>
      <h1 class="page-title">Department WhatsApp Groups</h1>
      <p class="page-subtitle">
        Join the official WhatsApp group for your department before arriving on campus.<br/>
        Choose your department below.
      </p>
    </header>

    <div class="search-container">
      <div class="search-wrap">
        <div class="search-input-row" :class="{ focused: isSearchFocused }">
          <span class="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search your department..."
            aria-label="Search your department"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="clear-btn"
            @click="searchQuery = ''"
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="departments-container">
      <div v-if="filteredDepartments.length === 0" class="empty-state">
        <h2 class="empty-title">No department found</h2>
        <p class="empty-subtitle">
          Try searching with another department name or contact SMP if you think a department is missing.
        </p>
      </div>
      
      <div v-else class="departments-grid">
        <div 
          v-for="dept in filteredDepartments" 
          :key="dept.id" 
          class="department-card"
        >
          <div class="card-content">
            <div class="dept-header">
              <h3 class="dept-name">{{ dept.name }}</h3>
            </div>
            <p class="dept-description">{{ dept.description }}</p>
          </div>
          <a 
            :href="dept.whatsappLink" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="join-btn"
            :aria-label="'Join ' + dept.name + ' WhatsApp Group'"
          >
            Join WhatsApp Group
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhatsAppGroups",
  data() {
    return {
      searchQuery: "",
      isSearchFocused: false,
      departments: [
                      {
                        id: 1,
                        name: "Aerospace Engineering",
                        description: "Chart the course beyond gravity, from rocket propulsion to aircraft design.",
                        whatsappLink: "https://chat.whatsapp.com/HYIUlECYVQX85O7uczqnit?s=cl&p=a&ilr=1"
                      },
                      {
                        id: 2,
                        name: "Applied Geophysics",
                        description: "Unearth the secrets of our planet, from seismic waves to tectonic shifts.",
                        whatsappLink: "https://chat.whatsapp.com/F60j5fY95msJkHcQuJRml4"
                      },
                      {
                        id: 3,
                        name: "Chemical Engineering",
                        description: "Master the molecules that matter, from renewable fuels to advanced materials.",
                        whatsappLink: "https://chat.whatsapp.com/JaEWOdbI31jLX0P6oGoRl5?s=cl&p=a&ilr=2"
                      },
                      {
                        id: 4,
                        name: "Chemistry",
                        description: "Delve into the reactions and structures that shape matter itself.",
                        whatsappLink: "https://chat.whatsapp.com/DV4qSn788jo7t0fpfQoSQD"
                      },
                      {
                        id: 5,
                        name: "Civil Engineering",
                        description: "Design the skylines and infrastructures that define modern civilization.",
                        whatsappLink: "https://chat.whatsapp.com/HuQtHbjlBOxCSOBl7lhUwR?s=cl&p=i&mlu=2&amv=1"
                      },
                      {
                        id: 6,
                        name: "Computer Science Engineering",
                        description: "Code the future, from artificial intelligence to scalable software systems.",
                        whatsappLink: "https://chat.whatsapp.com/EfCGOV1w2v5D4q4fHGsFVm?mode=gi_t"
                      },
                      {
                        id: 7,
                        name: "Economics",
                        description: "Decode the dynamics of global markets and human decision-making.",
                        whatsappLink: "https://chat.whatsapp.com/FKmiVHFRgNkKKlHeUKb5tB?s=cl&p=i&mlu=1&amv=1"
                      },
                      {
                        id: 8,
                        name: "Electrical Engineering",
                        description: "Power the world with innovations in circuits, systems, and quantum tech.",
                        whatsappLink: "https://chat.whatsapp.com/JEXHSZFKWWoG9rnp8uXwjQ?s=sh&p=a&ilr=0"
                      },
                      {
                        id: 9,
                        name: "Energy Science and Engineering",
                        description: "Pioneer sustainable solutions to meet the world's growing energy demands.",
                        whatsappLink: "https://chat.whatsapp.com/DzwGKv5oCVaBFvPswcXkYG"
                      },
                      {
                        id: 10,
                        name: "Engineering Physics",
                        description: "Bridge the gap between theoretical physics and cutting-edge technology.",
                        whatsappLink: "https://chat.whatsapp.com/BX6vvAR5UcB0JYUCijZ3IK"
                      },
                      {
                        id: 11,
                        name: "ESED",
                        description: "Engineer solutions to protect ecosystems and build a sustainable future.",
                        whatsappLink: "https://chat.whatsapp.com/IWYxdSUz7Sx6sy5ZqSg847?s=sw&p=i&mlu=0"
                      },
                      {
                        id: 12,
                        name: "IDC",
                        description: "Blend art, technology, and human psychology to craft beautiful experiences.",
                        whatsappLink: "https://chat.whatsapp.com/DAFvFLRSILs7qFQQZO0ksK?mode=gi_t"
                      },
                      {
                        id: 13,
                        name: "IEOR",
                        description: "Optimize complex systems and drive data-backed operational excellence.",
                        whatsappLink: "https://chat.whatsapp.com/G25igD7iD7684KvXpilQbT"
                      },
                      {
                        id: 14,
                        name: "Mathematics",
                        description: "Explore the abstract logic and elegant structures that govern the universe.",
                        whatsappLink: "https://chat.whatsapp.com/HmVGVE8ohc28DsD105aoR9"
                      },
                      {
                        id: 15,
                        name: "Mechanical Engineering",
                        description: "Innovate the mechanics of motion, from nanoscale machines to aerospace engines.",
                        whatsappLink: "https://chat.whatsapp.com/H1K4OhY1Od8CQCTQlJX6Ah?s=cl&p=i&mlu=2"
                      },
                      {
                        id: 16,
                        name: "Meta",
                        description: "Forge the future by discovering and developing revolutionary new materials.",
                        whatsappLink: "https://chat.whatsapp.com/FjKW9pJwevB2matBCvqCIC"
                      }
                    ]
    };
  },
  computed: {
    filteredDepartments() {
      if (!this.searchQuery) return this.departments;
      
      const query = this.searchQuery.toLowerCase();
      return this.departments.filter(dept => 
        dept.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.go-back {
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  color: #1c1b1f;
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 1;
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 24px;
}

.go-back span:last-child {
  font-weight: 800;
}

.back-chevron {
  width: 18px;
  height: 18px;
  border-left: 3px solid #1c1b1f;
  border-bottom: 3px solid #1c1b1f;
  transform: rotate(45deg);
}

.whatsapp-groups-page {
  width: 100%;
  max-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #1c1b1f;
  scrollbar-gutter: stable;
  padding-bottom: 28px;
  font-family: Inter, sans-serif;
}

.page-header {
  margin-top: 10px;
  margin-bottom: 24px;
}

.page-title {
  margin: 0 0 10px;
  font-size: 28px;
  line-height: 1.2;
  font-weight: 700;
  color: #000000;
}

.page-subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #555555;
  max-width: 600px;
}

.search-container {
  width: 100%;
  max-width: 600px;
  margin-bottom: 32px;
}

.search-wrap {
  position: relative;
  width: 100%;
}

.search-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1.5px solid #e0ddd5;
  border-radius: 52px;
  padding: 8px 14px;
  min-height: 42px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.search-input-row.focused {
  border-color: #c9a227;
  box-shadow: 0 0 0 3px rgba(255, 223, 128, 0.35);
}

.search-icon {
  display: flex;
  align-items: center;
  color: #888;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #1c1b1f;
  min-width: 0;
  font-family: Inter, sans-serif;
}

.search-input::placeholder {
  color: #aaa;
}

.clear-btn {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  padding: 2px;
  border-radius: 50%;
  transition: background 0.15s;
}

.clear-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: #333;
}

.departments-container {
  width: 100%;
}

.departments-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.department-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
}

.department-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-content {
  margin-bottom: 24px;
}

.dept-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}



.dept-name {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #1c1b1f;
  line-height: 1.2;
}

.dept-description {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.5;
  color: #555555;
}

.join-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  background: #ffdf80;
  color: #111111;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: Inter, sans-serif;
}

.join-btn:hover {
  background: #e6c870;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 16px;
  border: 1px dashed rgba(0, 0, 0, 0.15);
}

.empty-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
  color: #1c1b1f;
}

.empty-subtitle {
  margin: 0;
  font-size: 14px;
  color: #555555;
  max-width: 400px;
}

@media only screen and (max-width: 1024px) {
  .departments-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (max-width: 750px) {
  .whatsapp-groups-page {
    padding-bottom: 200px;
  }
  
  .page-header {
    margin-top: 18px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .departments-grid {
    grid-template-columns: 1fr;
  }
}
</style>
