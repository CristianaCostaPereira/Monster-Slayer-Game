function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },

    // health bars update when the player and monster healths changes
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }; // sets health bars to exaxtly zero if the game is over
            }
           return {width: this.monsterHealth + '%'};
        },

        playerBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.playerHealth + '%'};
        },

        // Makes sure that we only have access to the special attack every three rounds
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // Sets a draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // Sets draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player';
            }
        }
    },

    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },

        attackMonster() {
            this.currentRound++; // changes the round, each time we made an action
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;

            // Adds a log message
            this.addLogMessage('player', 'attack', attackValue);

            // So that attackPlayer triggers whenever we attack the monster
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;

            // Adds a log message
            this.addLogMessage('monster', 'attack', attackValue);
        },

        // Availabe only every 3 rounds
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;

            // Adds a log message
            this.addLogMessage('player', 'attack', attackValue);

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
            // Adds a log message
            this.addLogMessage('player', 'heal', healValue);

            this.attackPlayer();
        },

        surrender() {
            this.winner = 'monster';
        },

        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount('#game');