<template>
  <div
    class="sidebar"
    :style="
      windowWidth > 750
        ? { background: colourStore.sidebar, color: colourStore.emphasis_text }
        : showSidebar
        ? { background: colourStore.sidebar }
        : { width: '0px' }
    "
  >
    <div
      class="Logo"
      :style="
        windowWidth < 750
          ? { background: colourStore.primary }
          : { background: colourStore.sidebar }
      "
    >
      <div v-if="windowWidth < 750" class="burger" @click="Burger">
        <burger />
      </div>
      <div class="Logoimg"><Logo /></div>
    </div>
    <div class="sidebar-content" v-if="!showNotifications">
    <div
      class="Info"
      v-if="windowWidth > 750 || (showSidebar && windowWidth < 750)"
    >
      <div class="InfoText">
        Welcome aboard! <br />
        With the all new JEE Entrant's Portal NewBee, clear all your doubts about the admission process at IIT Bombay
      </div>

      <div class="InfoLinks">
      
        <button
          class="btn notif-btn" @click="notify"
          @mouseover="hovering = 4"
          @mouseleave="hovering = 0"
          :style="
            hovering == 4
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
          "
        >
          <Bell /><span class ="notification-mid" >&nbsp;&nbsp;Notifications </span> <span v-if="notifs.notifications" class="notificationCount" >{{ (notifs.notifications.length) ? notifs.notifications.length : '' }}</span>
        </button>
        

        <button
          class="btn"
          @mouseover="hovering = 1"
          @mouseleave="hovering = 0"
          :style="
            hovering == 1
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
          "
        >
          <email />&nbsp;&nbsp;smpcs2023@gmail.com
        </button>

        <button
          class="btn" @click="toSMP"
          @mouseover="hovering = 2"
          @mouseleave="hovering = 0"
          :style="
            hovering == 2
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
          "
        >
          <Globe />&nbsp;&nbsp;SMP Website
        </button>

        <button
          class="btn" @click="insta"
          @mouseover="hovering = 3"
          @mouseleave="hovering = 0"
          :style="
            hovering == 3
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
          "
        >
          <contact />&nbsp;&nbsp;smp.iitb
        </button>

        
      </div>
    </div>
  </div>
  <div class="notifications-content" v-if="(showNotifications && windowWidth > 750)">
    <div class="back-notify"><arrow @click="notify"/>  Notifications</div>
    <div class="notifs"  >
      <div class="notif" 
     v-for="notif in notifs.notifications" 
     :key="notif._id"
     @click="emitNotif(notif)"
     :style="{ background: colourStore.primary }">
      {{ notif.content.length > 24 ? notif.content.slice(0, 24) + '...' : notif.content }}
</div>

    </div>

  

    
    
  </div>
    <div
      class="Creds"
      v-if="windowWidth > 750 || ( showSidebar && windowWidth < 750)"
    >
      <button class="credentials" :style="{ background: colourStore.sidebar }">
        <DC class="DevComLogo" @click="toDevCom" /><SMP
          class="SMPLogo"
          @click="toSMP"
        />
      </button>
      <button
        class="logout"
        :style="{
          background: colourStore.sidebar,
          borderColor: colourStore.grey,
          color: colourStore.grey,
        }"
        @click="Logout"
      >
        Log out
      </button>
    </div>
  
  
  
</div>
</template>

<script>
import Logo from "../icons/Logo.svg";
import Globe from "../icons/web.svg";
import email from "../icons/email.svg";
import contact from "../icons/Insta.svg";
import burger from "../icons/menu.svg";
import DC from "../icons/DC.svg";
import SMP from "../icons/SMP_black.svg";
import arrow from "../icons/arrow.svg"
import Bell from "../icons/Bell.svg"

import { useAuthStore } from "@/stores/auth";
import { useColourStore } from "@/stores/colour";

export default {
  name: "Sidebar",
  setup() {
    const authStore = useAuthStore();
    const colourStore = useColourStore();
    return { authStore, colourStore };
  },
  components: {
    Logo,
    Globe,
    email,
    contact,
    burger,
    DC,
    SMP,
    arrow,
    Bell
  },
  emits : ['displaynotif'],
  data() {
    return {
      hovering: 0,
      windowWidth: window.innerWidth,
      showSidebar: false,
      showNotifications: false,
      notifs: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },

  created() {
    this.notifs = this.fetch_notifs()
    console.log(this.notifs)
    this.notifs = {
  "notifications": [
    {
      "_id": "60d4b5b8b3b3eb0015a07e72",
      "recipientlist": ["student123"],
      "senderid": "sender456",
      "contentid": "content789",
      "content": "Notification 1: Hello! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim semper tortor, vel sagittis justo bibendum eu. Integer consequat, dolor eget vestibulum faucibus, ligula justo pharetra purus, ac dignissim justo justo ut orci. Duis non felis turpis. Nulla facilisi. Morbi porta neque id magna iaculis, sed venenatis arcu fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Mauris ut convallis libero. Fusce bibendum est vel eros bibendum, vel interdum sapien faucibus. Nulla facilisi. Nam consequat ligula vel arcu sollicitudin rhoncus. Suspendisse potenti. Donec gravida nisi augue, a finibus ligula finibus vel. Maecenas placerat ipsum at augue pulvinar sollicitudin.",
      "sent_At": "2024-06-25T12:00:00.000Z",
      "isseen": false
    },
    {
      "_id": "60d4b5b8b3b3eb0015a07e73",
      "recipientlist": ["student123"],
      "senderid": "sender789",
      "contentid": "content101112",
      "content": "Notification 2: How are you? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim semper tortor, vel sagittis justo bibendum eu. Integer consequat, dolor eget vestibulum faucibus, ligula justo pharetra purus, ac dignissim justo justo ut orci. Duis non felis turpis. Nulla facilisi. Morbi porta neque id magna iaculis, sed venenatis arcu fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Mauris ut convallis libero. Fusce bibendum est vel eros bibendum, vel interdum sapien faucibus. Nulla facilisi. Nam consequat ligula vel arcu sollicitudin rhoncus. Suspendisse potenti. Donec gravida nisi augue, a finibus ligula finibus vel. Maecenas placerat ipsum at augue pulvinar sollicitudin.",
      "sent_At": "2024-06-26T08:30:00.000Z",
      "isseen": true
    },
    {
      "_id": "60d4b5b8b3b3eb0015a07e74",
      "recipientlist": ["student123"],
      "senderid": "sender123",
      "contentid": "content131415",
      "content": "Notification 3: Have a nice day! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim semper tortor, vel sagittis justo bibendum eu. Integer consequat, dolor eget vestibulum faucibus, ligula justo pharetra purus, ac dignissim justo justo ut orci. Duis non felis turpis. Nulla facilisi. Morbi porta neque id magna iaculis, sed venenatis arcu fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Mauris ut convallis libero. Fusce bibendum est vel eros bibendum, vel interdum sapien faucibus. Nulla facilisi. Nam consequat ligula vel arcu sollicitudin rhoncus. Suspendisse potenti. Donec gravida nisi augue, a finibus ligula finibus vel. Maecenas placerat ipsum at augue pulvinar sollicitudin.",
      "sent_At": "2024-06-27T15:45:00.000Z",
      "isseen": false
    }
  ]
}
 
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    async Burger() {
      this.showSidebar = !this.showSidebar;
      this.$emit("Burger", this.showSidebar);
    },
    async Logout() {
      console.log("logout");
      await this.authStore.Logout();
    },
    async toDevCom() {
      window.open("https://devcom-iitb.org/");
    },
    async toSMP() {
      window.open("https://smp.gymkhana.iitb.ac.in/");
    },
    async insta(){
      window.open("https://www.instagram.com/smp.iitb/")
    },
    async notify(){
      this.showNotifications = !this.showNotifications
    },
    async fetch_notifs(){
      const id = this.authStore.user_ID;
      console.log('user id : ', id);
      const res = await fetch(`http://localhost:8080/notification/${id}`)
      const data = await res.json()
      console.log(data)
      return data
    },
    emitNotif(notif){
      this.$emit('displaynotif', notif);
      console.log(notif)
      console.log('works')
    }
  },
};
</script>

<style scoped>
.sidebar {
  width: 92.38%;
  margin-top: 4.12%;
  margin-left: 4.12%;
  margin-bottom: 4.12%;
  padding-top: 5%;
  padding-bottom: 5%;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}


.Logo {
  height: 12.98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.burger {
  position: fixed;
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
  margin-bottom: 15%;
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
  border: none;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding-left: 7%;
  margin: 8px 0px;
  cursor: pointer;
}

.notif-btn{
  display: flex;

}

.notificationCount {
  justify-self: flex-end;
  /* align-self: flex-end; */
  color: orangered;
  font-weight: 600;
  margin-right: 1rem;
}
.notification-mid{
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
.notifications-content{
  margin-bottom: auto;
  margin-top: 1rem;
  width: 90%;
}

.notifs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* background-color: red; */

}
.notif {
  background-color: rgb(250,224,141);
  padding: 1em;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}
.Creds {
  width: 87.63%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.credentials {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: none;
}

.DevComLogo {
  cursor: pointer;
}

.SMPLogo {
  cursor: pointer;
}

.logout {
  width: 100%;
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

@media only screen and (max-width: 750px) {
  .sidebar {
    width: 70%;
    margin-top: 0px;
    border-radius: 0%;
    align-items: start;
  }

  .Logo {
    height: 80px;
    padding-top: 0%;
    width: 100vw;
  }

  .Info {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .InfoText {
    font-size: 16px;
  }

  .btn {
    font-size: 16px;
  }

  .Creds {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .btn-1 {
    justify-content: center;
    font-size: 16px;
  }
}
</style>
