import React from 'react'
import { View } from 'react-native'
import { useEffect,useRef } from 'react'
import LottieView from 'lottie-react-native'
export default function Loading() { 
    const lottieRef = useRef(null)

    useEffect(() => {
		// Reset animation on each render
        if (lottieRef.current) {
          setTimeout(() => {
            lottieRef.current?.play();
          }, 100);
        }
      }, [lottieRef.current]);

    return (
        <View>
            <LottieView 
                ref={lottieRef}
                source={require('../images/searching.json')} 
                autoPlay 
                loop 
                speed={1}
                style={{width:350,height:350,marginBottom:"5%"}}
                renderMode={"SOFTWARE"}
            />
        </View>
    )
}
