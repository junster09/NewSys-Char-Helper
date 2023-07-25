
const CHAR_FILE_EXTENTION = "nsc"
const CHAR_DEFAULT_SKILL_LIMIT = 10

//0: Combat ; 1: Non-Combat
const DICE = [
    "d5",
    "d10!"
]


//colors
const BUTTON_ACTIVE_COLOR = "#005fff"
const BUTTON_INACTIVE_COLOR = "#4e6a99"
const STRESS_BOX_ACTIVE_COLOR = "#e89090"

class SkillRank{
    constructor(_name,_color,_maxLevel){
        this.name = _name
        this.color = _color
        this._maxLevel = _maxLevel
    }
}

const skillRankDetails = []
skillRankDetails[0] = new SkillRank("UNK","#ffffff",99)
skillRankDetails[1] = new SkillRank("Bronze","#b36e00",10)
skillRankDetails[2] = new SkillRank("Silver","#a8a8a8",20)
skillRankDetails[3] = new SkillRank("Gold","#ffe882",30)

const SkillRanks = {
    UNK: 0,
    BRONZE: 1,
    SILVER: 2,
    GOLD: 3,
}

class BasicSkill {
    constructor(){
        this.name = "";
        this.rank = SkillRanks.UNK;
        this.level = 0;
        this.timesUsedSinceLastLevel = 0;
    }

    isSkill(){return true}
    getName(){return this.name;}
    setName(_name){this.name = _name;}

    getRank(){return this.rank;}
    setRank(_rank){this.rank = _rank;}

    getLevel(){return this.level;}
    setLevel(_level){this.level = _level}

    getTimesUsed(){return this.timesUsedSinceLastLevel;}
    setTimesUsed(_timesUsed){this.timesUsedSinceLastLevel = _timesUsed}

    init(_name,_rank,_level,_timesUsed){
        this.setName(_name);this.setRank(_rank);this.setLevel(_level);this.setTimesUsed(_timesUsed);
    }

    printData(){
        return "Name: " + this.name + "\nRank" + this.rank + "\nlevel"
        + this.level + "\nTimes Used This Level: " + this.timesUsedSinceLastLevel;
    }
}

class Character{
    constructor(){
        this.name = "";
        this.skills = [];
        this.skillLimit = CHAR_DEFAULT_SKILL_LIMIT;
        this.stressBoxes = [false,false,false,false]
        this.consequences = ["NONE","NONE","NONE","NONE"]
        this.maxFatePoints = 2
        this.currentFatePoints = this.maxFatePoints
    }

    isChar(){return true}

    init(_name){
        this.name = _name
    }

    addSkill(_skillSlot,_skill){
        if (this.skills[_skillSlot - 1] == null && _skillSlot <= this.skillLimit) {
            this.skills[(_skillSlot - 1)] = _skill;
        }
    }
    setSkills(SkillList){
        for(let i=0;i<SkillList.length;i++){
            this.skills[i] = SkillList[i];
        }
    }

    overwriteCharacterFromObject(newChar){
        //if (newChar.isChar == null){console.log("Character overwrite failed");return false;}
        this.name = newChar.name;
        this.skillLimit = newChar.skillLimit;
        this.stressBoxes = newChar.stressBoxes;
        this.consequences = newChar.consequences;
        this.maxFatePoints = newChar.maxFatePoints;
        this.currentFatePoints = newChar.currentFatePoints;

        for(let i=0;i<newChar.skills.length;i++){
            const e = newChar.skills[i]
            const tempSkill = new BasicSkill()
            tempSkill.init(e.name,e.rank,e.level,e.timesUsedSinceLastLevel)
            this.addSkill((i+1),tempSkill)
        }

        return true

    }

    getName(){return this.name;}
    getSkillLimit(){return this.skillLimit;}
    getSkills(){return this.skills;}
    getConsequences(){return this.consequences;}
    getStressBoxes(){return this.stressBoxes;}
    setStressBoxes(input){
        this.stressBoxes = input
    }
    setStressBox(pos,state){
        if(this.stressBoxes[pos] == null){return false;}

        this.stressBoxes[pos] = state
    }

}

class CharCreateSkillButton{
    constructor(_parent,_skillSlot,_char){
        this.parent = _parent
        this.skillSlot = _skillSlot
        if (_char != null){this.char = _char}else{this.skill = new Character()}
        this.buttonListener = null
        this.skillRef = this.char.getSkills()[_skillSlot]
        this.htmlBox = null
    }

    buildButton(){
        this.htmlBox = document.createElement("DIV")
        this.htmlBox.class = "skillCreateSkill"
        this.htmlBox.id = "skillCreate" + this.skillSlot

        const nameLabel = document.createElement("LABEL")
        nameLabel.htmlFor = "skillName" + this.skillSlot
        nameLabel.innerHTML = "[" + (this.skillSlot + 1) + "]"

        const nameInput = document.createElement("INPUT")
        nameInput.type = "text"
        nameInput.id = "skillName" + this.skillSlot
        nameInput.name = nameInput.id
        nameInput.placeholder = "skill name"
        nameInput.size = "10"

        const rankSelector = document.createElement("SELECT");rankSelector.name = "skillRank" + this.skillSlot;
        for(let i=0;i<skillRankDetails.length;i++){
            const e = document.createElement("OPTION")
            e.value = i
            e.innerHTML = skillRankDetails[i].name
            rankSelector.appendChild(e)
        }

        const levelLabel = document.createElement("LABEL")
        levelLabel.htmlFor = "skillLevel" + this.skillSlot
        levelLabel.innerHTML = "Level:"

        const levelInput = document.createElement("INPUT")
        levelInput.type = "number"
        levelInput.id = "skillLevel" + this.skillSlot; levelInput.name = levelInput.id
        levelInput.placeholder = 0
        levelInput.min = 0
        levelInput.max = 999
        levelInput.step = 1

        const usedLabel = document.createElement("LABEL")
        usedLabel.htmlFor = "skillUsed" + this.skillSlot
        usedLabel.innerHTML = "Used:"
        const usedInput = document.createElement("INPUT")
        usedInput.type = "number"
        usedInput.id = "skillUsed" + this.skillSlot; levelInput.name = levelInput.id
        usedInput.placeholder = 0
        usedInput.min = 0
        usedInput.max = 999
        usedInput.step = 1

        const br = document.createElement("BR")


        this.htmlBox.appendChild(nameLabel)
        this.htmlBox.appendChild(nameInput)

        this.htmlBox.appendChild(rankSelector)
        this.htmlBox.appendChild(br)

        this.htmlBox.appendChild(levelLabel)
        this.htmlBox.appendChild(levelInput)

        this.htmlBox.appendChild(usedLabel)
        this.htmlBox.appendChild(usedInput)

        this.parent.appendChild(this.htmlBox)
    }

    deleteButton(){

    }
}