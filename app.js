function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        };
    },

    // health bars update when the player and monster healths changes
    computed: {
        monsterBarStyle() {
           return {width: this.monsterHealth + '%'};
        },

        playerBarStyle() {
            return {width: this.playerHealth + '%'};
        }
    },

    methods: {
        attackMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;

            // So that attackPlayer triggers whenever we attack the monster
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        }
    }
});

app.mount('#game');