module Main where

import Prelude
import Effect (Effect)
import Effect.Console (logShow)
import Math (sqrt, pi)

diagonal :: Number -> Number -> Number
diagonal width height = do
  sqrt (width * width + height * height)

circleArea :: Number -> Number
circleArea radius = pi * (sqrt radius)

main :: Effect Unit
main = do
  logShow (diagonal 3.0 4.0)
