Feature: Google can search
  In order to do

  Scenario: Can search
    When go to "https://www.google.com"
    Then take screenshot "Started google"
    Then type "Köttbulle" in ".gLFyf.gsfi"
    Then click ".FPdoLc.VlcLAe .gNO89b"
    Then take screenshot "Sökt på Köttbulle"

#Scenario Outline: Trygghet
#  Given kundportalen med rådgivaren RetirementGuideUser, standardkund <standardkund>, med REAL för testet <testet>
#  When gå till Trygghet
#  Then ta bild "Visar trygghet"
#  Then skapa bildtest

#Examples:
#  | testet   | standardkund |
#  | "Lisa"   | 0            |
#  | "Ludvig" | 1            |
#  | "Irene"  | 2            |

