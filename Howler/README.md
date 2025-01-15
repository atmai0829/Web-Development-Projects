# <img src="../images/MP4.svg" alt="" width="35" height="36" style="vertical-align: bottom"> Mini Project 4

An interesting challenge you encountered when implementing Howler. What was the issue, and how did you solve it?
There were sometimes that the user of a profile loaded, would not show the user. I found out it was because my api.getCurrentUser was asynchronous which would lead to the current user to be undefined sometimes. To solve this, I would check if the current user was defined. If it was not, then I would use getCurrentUser again.
What additional feature would you add to Howler, and how would you suggest it should be implemented?
I would suggest the howl to utilize, like and reply. I do not think it would be too difficult, the howls would just have another field for replies and likes that would be used.
