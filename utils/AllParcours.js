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
		STL : ["ALGAV","IL","Anglais","DLP","OUV"],
		SFPN : ["MODEL","COMPLEX","BDD","PPAR","SC"],
		DIGITAL : ["SIGCOM","COMNET"],
		MSI : ["AFORP"],
		"RES-ESIEE-IT" : ["OQR"],
	},
	M2 :{
		IMA : ["VISION","MAPIMED","TADI","IG3DA","RDFIA","PRAT","BIOMED","OIP"],
		DAC : ["RLD","BDLE","REDS","XAI","AMAL","LODAS","OIP"],
		ANDROIDE : ["MOSIMA","COCOMA","MAOA","MADI","IAR","EVHI","ISG","AOTJ","MADMC"],
		BIM : ["STRUCT","RESYS","GPOP","PHYG","SPLEX","MEET"],
		IQ : ["PhQC","QCrypt","QIT","QAlg"],
		RES : ["DAAR","NETMET","IOB","OIP","ITQOS","SECRES","ANET","CELL","NEVA","NAM","IQOS"],
		SAR : ["ARA","NMV","DEVREP","DATACLOUD","ASTRE"],
		SESI : ["HOTOP","gpe","PBD","HLS","MASSOC","IMSE","MOCCA","VLSI(2)","PROG","COCCA","PAR"],
		STL : ["TAS","DAAR","AAGA","PPC","PISTL","TPEA","GRAPA","ALASCA"],
		SFPN : ["POSSO","SCA","AFORP","HPCA","CM","AFAE","CRYPTA","OIP"],
		DIGITAL : ["SIGCOM","COMNET"],
		MSI : ["FORENSIC"],
		"RES-ESIEE-IT" : ["MSSI"],
		"STL-INSTA" : ["GPSTL"]
	},
}

export const allUEsorted = {
	"M1" : [
		"BIMA","MAPSI","MLBDA","LRC","MOGPL","AAGB","Maths","QCLG","QPh4CS","RTEL","ARES","PROGRES","PSCR","NOYAU","MOBJ","ARCHI","SIGNAL",
		"VLSI","ESA","ALGAV","IL","Anglais","DLP","MODEL","COMPLEX","BDD","PPAR","SC","OQR","OUV"
	].sort(),
	"M2" : [
		"VISION","MAPIMED","TADI","IG3DA","RDFIA","PRAT","BIOMED","RLD","BDLE","REDS","XAI","AMAL","LODAS","MOSIMA","COCOMA","MAOA","MADI","IAR","EVHI",
		"ISG","AOTJ","MADMC","STRUCT","RESYS","GPOP","PHYG","SPLEX","MEET","PhQC","QCrypt","QIT","QAlg","DAAR","NETMET","IOB","OIP","ITQOS","SECRES","ANET","CELL",
		"ARA","NMV","DEVREP","DATACLOUD","ASTRE","HOTOP","gpe","PBD","HLS","MASSOC","IMSE","MOCCA","VLSI(2)","PROG","TAS","DAAR","AAGA","PPC","PISTL","TPEA",
		"POSSO","SCA","AFORP","HPCA","CM","AFAE","CRYPTA","NEVA","NAM","IQOS","MSSI","COCCA","PAR","FORENSIC","GRAPA","ALASCA","GPSTL"
	].sort()

}

export const allCodeUE = {
	"MOGPL" : "MU4IN200",
	"MOSIMA" : "MU5IN254",
	"COCOMA" : "MU5IN250",
	"MAOA" : "MU5IN251",
	"MADI" : "MU5IN253",
	"IAR" : "MU5IN259",
	"ISG" : "MU5IN258",
	"AOTJ": "MU5IN257",
	"EVHI" : "MU5IN252",
	"OIP" : "MU5INOIP",
	"MADMC":"MU5IN256",
	"AAGB" : "MU4IN700",
	"Maths" : "MU4MA062",
	"GPOP" : "MU5IN752",
	"STRUCT" : "MU5IN755",
	"PHYG" :"MU5IN751",
	"RESYS" :"MU5IN754",
	"SPLEX" : "MU5IN753",
	"MLBDA" :"MU4IN801",
	"LRC" :"MU4IN800",
	"AMAL" :"MU5IN861",
	"RLD" : "MU5IN862",
	"REDS" :"MU5IN863",
	"XAI" : "MU5IN864",
	"BDLE" :"MU5IN852",
	"LODAS" : "MU5IN860",
	"MAPSI" : "MU4IN601",
	"BIMA" : "MU4IN600",
	"MAPIMED" : "MU5IN655",
	"BIOMED" : "MU5IN654",
	"TADI" : "MU5IN650",
	"IG3DA" : "MU5IN653",
	"VISION" : "MU5IN651",
	"PRAT" : "MU5IN656",
	"RDFIA" : "MU5IN652",
	"QK4CS" : "MU4INQ01",
	"QPh4CS" : "MU4INQ02",
	"QCLG" : "MU4INQ05",
	"PhQC" : "MU5PYQ04",
	"QCrypt" : "MU5INQ02",
	"QIT" : "MU5PYQ03",
	"QAlg" : "MU5INQ01",
	"SIGCOM" : "MU4INX06",
	"COMNET" : "MU4INX05",
	"ARES" : "MU4IN001",
	"RTEL" : "MU4IN002",
	"PROGRES" : "MU4IN014",
	"OQR" : "MU4IN010",
	"DAAR" : "MU5IN552",
	"NETMET" : "MU5IN066",
	"NEVA" : "MU5IN056",
	"CELL" : "MU5IN050",
	"NAM" : "MU5IN075",
	"IQOS" : "MU5IN053",
	"SECRES" : "MU5IN059",
	"MSSI" : "MU5IN077",
	"PSCR" : "MU4IN400",
	"NOYAU" : "MU4IN401",
	"MOBJ" : "MU4IN103",
	"ESA" : "MU4EES05",
	"ARCHI" :"MU4IN100",
	"SIGNAL" : "MU4IN104",
	"VLSI" : "MU4IN101",
	"gpe1":"MU5INOIP",
	"MASSOC" : "MU5IN150",
	"PROG" : "MU5IN160",
	"PAR" : "MU5IN160",
	"HOTOP" : "MU5IN166",
	"MOCCA" : "MU5IN159",
	"IMSE" : "MU5IN165",
	"PBD" : "MU5IN156",
	"HLS" : "MU5IN156",
	"COCCA" : "MU5IN164",
	"SC" : "MU4IN900",
	"CM": "MU5IN974",
	"SCA" : "MU5IN954",
	"IL":"MU4IN502",
	"ALGAV" :"MU4IN500",
	"DLP" :"MU4IN501",
	"Anglais":"MU4XAN01",
	"TPEA":"MU5IN562",
	"PPC" :"MU5IN553",
	"TAS":"MU5IN555",
	"GRAPA" : "MU5IN556",
	"PISTL" : "MU5IN559",
	"ALASCA" :"MU5IN551",
	"AAGA" : "MU5IN550",
	"GPSTL":"5I558",
	"OUV" : "MU4IN511"
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
		DIGITAL : "#c1ddb6",
		MSI : "#d8ebc2",
		"RES-ESIEE-IT" : "#dee67c",
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
		MSI : "#8ea4a8",
		"RES-ESIEE-IT" : "#f39ab2",
		"STL-INSTA" : "#f9b4a7"
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