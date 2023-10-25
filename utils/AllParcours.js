import { Dimensions } from "react-native"

export const width = Dimensions.get("window").width
export const height = Dimensions.get("window").height

export const allParcours = [
    "IMA","DAC","ANDROIDE","BIM","IQ","RES","SAR","SESI","STL","SFPN","MSI","STL-INSTA","RES-ESIEE-IT","DIGITAL"
]

export const allUE = {
	M1 : {
		IMA : ["BIMA","MAPSI"],
		DAC : ["MLBDA","LRC"],
		ANDROIDE : ["MOGPL"],
		BIM : ["AAGB","Maths"],
		IQ : ["QCLG","QPh4CS"],
		RES : ["RTEL","ARES","PROGRES"],
		SAR : ["PSCR","NOYAU"],
		SESI : ["MOBJ","ARCHI","SIGNAL","VLSI","ESA"],
		STL : ["ALGAV","IL","Anglais","DLP"],
		SFPN : ["MODEL","COMPLEX","BDD","PPAR","SC"],
	},
	M2 :{
		IMA : ["VISION","MAPIMED","TADI","IG3DA","RDFIA","PRAT","BIOMED"],
		DAC : ["RLD","BDLE","REDS","XAI","AMAL","LODAS"],
		ANDROIDE : ["MOSIMA","COCOMA","MAOA","MADI","IAR","EVHI","ISG","AOTJ","MADMC"],
		BIM : ["STRUCT","RESYS","GPOP","PHYG","SPLEX","MEET"],
		IQ : ["PhQC","QCrypt","QIT","QAlg"],
		RES : ["DAAR","NETMET","IOB","OIP","ITQOS","SECRES","ANET","CELL"],
		SAR : ["ARA","NMV","DEVREP","DATACLOUD","ASTRE"],
		SESI : ["HOTOP","gpe","PBD","HLS","MASSOC","IMSE","MOCCA","VLSI(2)","PROG","PAR"],
		STL : ["TAS","DAAR","AAGA","PPC","PISTL","TPEA"],
		SFPN : ["POSSO","SCA","AFORP","HPCA","CM","AFAE","CRYPTA","OIP"],

	},
}

export const allUEsorted = {
	"M1" : [
		"BIMA","MAPSI","MLBDA","LRC","MOGPL","AAGB","Maths","QCLG","QPh4CS","RTEL","ARES","PROGRES","PSCR","NOYAU","MOBJ","ARCHI","SIGNAL",
		"VLSI","ESA","ALGAV","IL","Anglais","DLP","MODEL","COMPLEX","BDD","PPAR","SC"
	].sort(),
	"M2" : [
		"VISION","MAPIMED","TADI","IG3DA","RDFIA","PRAT","BIOMED","RLD","BDLE","REDS","XAI","AMAL","LODAS","MOSIMA","COCOMA","MAOA","MADI","IAR","EVHI",
		"ISG","AOTJ","MADMC","STRUCT","RESYS","GPOP","PHYG","SPLEX","MEET","PhQC","QCrypt","QIT","QAlg","DAAR","NETMET","IOB","OIP","ITQOS","SECRES","ANET","CELL",
		"ARA","NMV","DEVREP","DATACLOUD","ASTRE","HOTOP","gpe","PBD","HLS","MASSOC","IMSE","MOCCA","VLSI(2)","PROG","PAR","TAS","DAAR","AAGA","PPC","PISTL","TPEA",
		"POSSO","SCA","AFORP","HPCA","CM","AFAE","CRYPTA","OIP"
	].sort()

}



export const colorParcours = {
	M1 : {
		IMA : "#d4a571",
		DAC : "#818b90",
		ANDROIDE : "#DA7CA0",
		BIM : "#fd89cd",
		IQ : "#70f5fa",
		RES : "#c1cdac",
		SAR : "#8baad1",
		SESI : "#de76f5",
		STL : "#c88979",
		SFPN : "#e5c4a9",
	},
	M2 : {
		IMA : "#8b85b5",
		DAC : "#978b9b",
		ANDROIDE : "#dc85c8",
		BIM : "#bed9cf",
		IQ : "#6fbcfe",
		RES : "#ded1d7",
		SAR : "#85cd8b",
		SESI : "#cecfb3",
		STL : "#9889e5",
		SFPN : "#e5c4a9",
	},
}

export function getParcoursOfMyUE(myUE,lvl){
	parcours = []
	for (const ue of myUE){
		for (const parcour in allUE[lvl]){
			if (allUE[lvl][parcour].includes(ue) && !parcours.includes(parcour))
				parcours.push(parcour)
		}
	}
	return parcours
}