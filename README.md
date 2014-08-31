damrep
======

Damage Report Manager webapp

Changelog

- Initial release: 
    Timer with alarm at intervals, game over sound after final interval
    Variable number of intervals (Damage Report cards) and variable interval length

- Phase 2 release
    Corridor breach status indicators
    Hull Damage and Crisis Tracker meters
    Five Ship System indicators with up/down buttons
    Ship Systems can be customised with a Module name (with corresponding starting value and color schemes to match board indicators), Critical toggle and visibility

- Phase 3 release
    Automatic application of Damage Report cards to Ship Systems, Corridor Breach and Hull Damage
    Reset button now resets Ship Systems, Corridor Breach and Hull Damage to original settings (including custom module initial settings)
    

Current bugs
    - Hull Damage will not automatically apply if no Shield module is assigned to a Ship System
    
Current issues
    - Event cards are currently not supported
    - Scenarios using set card ranges such as Icarus and Puffballs are not supported as the card shuffler is shuffling all non-event cards (DR01-DR39)
    
    
Features to be implemented
    - Redesign Settings page to have 3 tabs, Timer, Systems and Damage Reports. Remove clutter and able to support Damage Report card customisations (scenarios, choose cards)
    - Implement Event card mechanic, most will only display a message, some have the ability to be automatically applied (Disaster Looms, Cataclysm, Critical Hit). As all Event cards end with drawing and resolving another, they will not be included in the timer length and will call the drawCard function again.
    - Add additional graphics to the interface and adjust color palettes once information is received from BFR
    
