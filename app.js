function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        };
    },

    // health bars update when the player and monster healths changes
    computed: {
        monsterBarStyle() {
           return {width: this.monsterHealth + '%'};
        },

        playerBarStyle() {
            return {width: this.playerHealth + '%'};
        },

        // So we disable the button if the division of three does not leave a remainder of zero
        // Make sure that we only have access to the special attack every three rounds
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },

    methods: {
        attackMonster() {
            this.currentRound++; // changes the round, each time we made an action
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;

            // So that attackPlayer triggers whenever we attack the monster
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },

        // Availabe only every 3 rounds
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;

            this.attackPlayer();
        },

        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            // So we do not heal above than 100 health
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
    },
});

app.mount('#game');