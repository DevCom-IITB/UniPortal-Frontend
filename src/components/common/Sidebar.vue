<template>
  <aside class="sidebar">
    <button v-if="windowWidth < 750" class="burger" type="button" @click="Burger" aria-label="Toggle menu">
      <burger />
    </button>

<<<<<<< Updated upstream
    <div class="sidebar-content" v-if="!showNotifications">
      <div class="Info" v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)">
        <div class="InfoText">
          Welcome aboard! <br />
          With the all new JEE Entrant's Portal NewBee, clear all your doubts about the admission process at IIT Bombay
        </div>

        <div class="InfoLinks">


          <button class="btn notif-btn" @click="notify" @mouseover="hovering = 4" @mouseleave="hovering = 0" :style="hovering == 4
            ? {
              background: colourStore.active_hovering,
              color: colourStore.emphasis_text,
            }
            : windowWidth > 750
              ? {
                background: colourStore.sidebar,
                color: colourStore.emphasis_text,
              }
              : { background: colourStore.sidebar }
            ">
            <Bell /><span class="notification-mid">&nbsp;&nbsp;Notifications </span> <span v-if="notifs.notifications"
              class="notificationCount">{{ (notifs.notifications.length) ? notifs.notifications.length : '' }}</span>
          </button>


          <button class="btn" @mouseover="hovering = 1" @mouseleave="hovering = 0" :style="hovering == 1
            ? {
              background: colourStore.active_hovering,
              color: colourStore.emphasis_text,
            }
            : windowWidth > 750
              ? {
                background: colourStore.sidebar,
                color: colourStore.emphasis_text,
              }
              : { background: colourStore.sidebar }
            ">
            <email />&nbsp;&nbsp;smpcs2025@gmail.com

          </button>

          <button class="btn" @click="toSMP" @mouseover="hovering = 2" @mouseleave="hovering = 0" :style="hovering == 2
            ? {
              background: colourStore.active_hovering,
              color: colourStore.emphasis_text,
            }
            : windowWidth > 750
              ? {
                background: colourStore.sidebar,
                color: colourStore.emphasis_text,
              }
              : { background: colourStore.sidebar }
            ">
            <Globe />&nbsp;&nbsp;SMP Website
          </button>

          <button class="btn" @click="insta" @mouseover="hovering = 3" @mouseleave="hovering = 0" :style="hovering == 3
            ? {
              background: colourStore.active_hovering,
              color: colourStore.emphasis_text,
            }
            : windowWidth > 750
              ? {
                background: colourStore.sidebar,
                color: colourStore.emphasis_text,
              }
              : { background: colourStore.sidebar }
            ">
            <contact />&nbsp;&nbsp;smp.iitb
          </button>


        </div>
      </div>

    </div>
    <div class="notifications-content"
      v-if="(showNotifications && windowWidth > 750) || (showSidebar && showNotifications && windowWidth < 750)">
      <div class="back-notify">
        <arrow class="arrow" @click="notify" /> Notifications
      </div>
      <div class="notifs">
        <div class="notif" v-for="notif in notifs.notifications" :key="notif._id" @click="emitNotif(notif)"
          :style="{ background: colourStore.primary }">
          {{ notif.content.length > 16 ? notif.content.slice(0, 16) + '...' : notif.content }}
        </div>

      </div>





    </div>
    <div class="Creds" v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)">

      <button class="credentials" :style="{ background: colourStore.sidebar }">
        <DC class="DevComLogo" @click="toDevCom" />
        <SMP class="SMPLogo" @click="toSMP" />
=======
    <section class="welcome-section">
      <Logo class="sidebar-mark" />
      <h1>Welcome to<br />Newbee</h1>
      <p>
        Ask seniors anything before campus starts. Join 5,000+ freshmen getting
        ready for the hive.
      </p>
    </section>

    <section class="quick-links-section" v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)">
      <div class="quick-links-header">
        <open_in_new class="link-icon-header" />
        <span>Quick Links</span>
      </div>
      <button class="link-row" type="button" @click="whatsapp">
        <Globe class="link-icon" />
        <span>Whatsapp Group</span>
>>>>>>> Stashed changes
      </button>
      <button class="link-row" type="button" @click="smpEmail">
        <email class="link-icon" />
        <span>SMP Email</span>
      </button>
<<<<<<< Updated upstream
    </div>



  </div>
=======
      <button class="link-row" type="button" @click="toSMP">
        <Globe class="link-icon" />
        <span>SMP Website</span>
      </button>
      <button class="link-row" type="button" @click="insta">
        <contact class="link-icon" />
        <span>SMP Instagram</span>
      </button>
    </section>
  </aside>
>>>>>>> Stashed changes
</template>


<script>
import Globe from "../icons/web.svg";
import email from "../icons/email.svg";
import contact from "../icons/Insta.svg";
import burger from "../icons/menu.svg";
<<<<<<< Updated upstream
import DC from "../icons/DC.svg";
import SMP from "../icons/SMP_black.svg";
import arrow from "../icons/arrow.svg";
import Bell from "../icons/Bell.svg";
=======
import open_in_new from "../icons/open_in_new.svg";
import Logo from "../icons/Logo.svg";
>>>>>>> Stashed changes

import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "@/stores/colour";
import { useQuestionStore } from '@/stores/question'

export default {
  name: "Sidebar",
  components: {
    Globe,
    email,
    contact,
    burger,
<<<<<<< Updated upstream
    DC,
    SMP,
    arrow,
    Bell
  },
  emits: ['displaynotif'],
  setup() {
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    const QuestionStore = useQuestionStore()

    const fetchNotifs = async () => {
      try {
        const user_id = authStore.user_ID;
        // console.log('user id : ', user_id);

        const bearer = `Bearer ${authStore.accessToken}`;
        // console.log('bearer : ', bearer);

        const res = await fetch(`${import.meta.env.VITE_API_BASE}/notification/get/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: bearer,
          },
        });

        if (res.status === 200) {
          // console.log('Received response');
          const data = await res.json();
          // console.log(data);
          return data;
        } else if (res.status === 403) {
          // console.log('Refreshing token');
          const refreshRes = await authStore.Refresh();

          if (refreshRes.status === 200) {
            // console.log('Refreshed token');
            const newBearer = `Bearer ${authStore.accessToken}`;
            // console.log('New bearer : ', newBearer);


            const retryRes = await fetch(`${import.meta.env.VITE_API_BASE}/notification/get/${user_id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: newBearer,
              },
            });

            if (retryRes.status === 200) {
              console.log('Received response after token refresh');
              const data = await retryRes.json();
              // console.log(data);
              return data;
            } else {
              console.error('Failed to fetch notifications after token refresh');
              return [];
            }
          } else {
            console.error('Failed to refresh token');
            return [];
          }
        } else {
          console.error('Failed to fetch notifications');
          return [];
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        return [];
      }
    };

    return {
      authStore,
      colourStore,
      fetchNotifs,
    };
=======
    open_in_new,
    Logo,
>>>>>>> Stashed changes
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      showSidebar: false,
      showNotifications: false,
      notifs: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
      this.loadNotifications();
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async loadNotifications() {
      try {
        this.notifs = await this.fetchNotifs();
        this.notifs.notifications.reverse();
        // console.log('Loaded notifications:', this.notifs);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    },
    async Burger() {
      this.showSidebar = !this.showSidebar;
      this.$emit("Burger", this.showSidebar);
    },
    async Logout() {
      await this.authStore.Logout();
    },
<<<<<<< Updated upstream
    async toDevCom() {
      window.open("https://devcom.gymkhana.iitb.ac.in/");
    },
=======
>>>>>>> Stashed changes
    async toSMP() {
      window.open("https://gymkhana.iitb.ac.in/~smp/");
    },
    async whatsapp() {
      window.open("https://chat.whatsapp.com/");
    },
    async smpEmail() {
      window.open("mailto:smp@iitb.ac.in");
    },
    async insta() {
      window.open("https://www.instagram.com/smp.iitb/");
    },
<<<<<<< Updated upstream
    async notify() {
      this.showNotifications = !this.showNotifications;
    },
    emitNotif(notif) {
      this.$emit('displaynotif', notif);
      console.log(notif);
      console.log('works');
      this.Burger()
    },
    // async SetQuestionView() {
    //   await this.QuestionStore.SetQuestion(this.question);
    //   await this.QuestionStore.SetQuestionID(this.question['_id']);
    // },
  }
=======
  },
>>>>>>> Stashed changes
};
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  padding: 26px 20px 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  overflow: hidden;
  background: #fceeb9;
  color: #000000;
}

<<<<<<< Updated upstream

.Logo {
  height: 12.98%;
=======
.welcome-section {
>>>>>>> Stashed changes
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%; /* Stretches the section container to match full sidebar width */
}

.sidebar-mark {
  width: 65px;
  height: 70px;
  margin-bottom: 20px;
  display: block;       /* Necessary for automatic margins to work */
  margin-left: auto;    /* Centers the logo from the left */
  margin-right: auto;   /* Centers the logo from the right */
}

.welcome-section h1 {
  margin: 0 0 18px;
  font-size: 32px;
  line-height: 1.06;
  font-weight: 700;
  color: #000000;
  letter-spacing: 0;
}

.welcome-section p {
  margin: 0;
  max-width: 205px;
  font-size: 13px;
  line-height: 1.45;
  font-weight: 400;
  color: #1c1b1f;
}

.quick-links-section {
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-bottom: 2px;
}

.quick-links-header {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;
  color: #000000;
}

.quick-links-header span {
  font-size: 19px;
  line-height: 1;
  font-weight: 700;
}

.link-icon-header {
  width: 16px;
  height: 16px;
}

.link-row {
  border: none;
  background: transparent;
  width: 100%;
  padding: 0 0 0 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000000;
  cursor: pointer;
  text-align: left;
  font-family: Inter, sans-serif;
}

.link-row span {
  font-size: 12px;
  line-height: 1.25;
  font-weight: 500;
  text-decoration: underline;
}

.link-icon {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.burger {
  position: fixed;
<<<<<<< Updated upstream
  left: 16px;
  margin-top: 8px;
}

.Logoimg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.Info {
  width: 87.63%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 16px 0px;
}

.InfoText {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5%;
}

.InfoLinks {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.btn {
  width: 100%;
  height: 48px;
=======
  left: 14px;
  top: 14px;
  z-index: 12;
>>>>>>> Stashed changes
  border: none;
  background: #ffdf80;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
<<<<<<< Updated upstream
  font-size: 16px;
  font-weight: 600;
  padding-left: 7%;
  margin: 8px 0px;
  cursor: pointer;
}

.notif-btn {
  display: flex;

}

.arrow {
  cursor: pointer;
}

.notificationCount {
  justify-self: flex-end;
  /* align-self: flex-end; */
  color: orangered;
  font-weight: 600;
  margin-right: 1rem;
}

.notification-mid {
  margin-right: auto;
  font-size: 16px;
  font-weight: 600;
}

.back-notify {
  display: flex;
  gap: 0.5rem;
  font-size: 16px;
  font-weight: 600;
  justify-content: left;
  margin-bottom: 1em;
}

.notifications-content {
  margin-bottom: auto;
  margin-top: 1rem;
  width: 90%;
}

.notifs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* background-color: red; */
  max-height: 400px;
  overflow-y: auto;

}

.notif {
  background-color: rgb(250, 224, 141);
  padding: 1em;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  cursor: pointer;
}


.Creds {
  width: 87.63%;
  display: flex;
  flex-direction: column;
=======
>>>>>>> Stashed changes
  justify-content: center;
  cursor: pointer;
}

<<<<<<< Updated upstream
.SMPLogo {
  cursor: pointer;
}

.logout {
  width: 98%;
  height: 48px;
  border: none;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  padding-left: 7%;
  margin: 8px 0px;
  cursor: pointer;
  border: 1px solid;
}

@media only screen and (max-width: 1150px) {
  .InfoText {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 50px;
  }

  .btn {
    font-size: 14px;
  }

  .btn-1 {
    font-size: 14px;
  }
}

@media only screen and (max-width: 950px) {
  .InfoText {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 50px;
  }

  .btn {
    font-size: 12px;
  }

  .btn-1 {
    font-size: 12px;
  }
}

=======
>>>>>>> Stashed changes
@media only screen and (max-width: 750px) {
  .sidebar {
    width: 70vw;
    height: 100vh;
    border-radius: 0 20px 20px 0;
    padding: 82px 24px 28px;
    box-shadow: 12px 0 28px rgba(0, 0, 0, 0.14);
  }

  .sidebar-mark {
    width: 54px;
    height: 58px;
    display: block;
    margin-left: auto;   /* Centers logo on mobile sizing */
    margin-right: auto;
  }

  .welcome-section h1 {
    font-size: 29px;
  }
}
</style>