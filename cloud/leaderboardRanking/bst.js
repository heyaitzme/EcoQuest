class BSTNode {
  constructor(user) {
    this.score = user.score
    this.users = [user] // Handle score duplicates
    this.left = null
    this.right = null
  }
}

class LeaderboardBST {
  constructor() {
    this.root = null
    this.sortedList = []
  }

  insert(user) {
    const newNode = new BSTNode(user)
    if (!this.root) {
      this.root = newNode
      return
    }
    
    let current = this.root
    while (true) {
      if (user.score === current.score) {
        current.users.push(user)
        break
      } else if (user.score > current.score) {
        if (!current.right) {
          current.right = newNode
          break
        }
        current = current.right
      } else {
        if (!current.left) {
          current.left = newNode
          break
        }
        current = current.left
      }
    }
  }

  inOrderTraversal(node = this.root) {
    if (node) {
      this.inOrderTraversal(node.right) // Descending order
      this.sortedList.push(...node.users)
      this.inOrderTraversal(node.left)
    }
  }

  getSortedLeaderboard(users) {
    users.forEach(user => this.insert(user))
    this.inOrderTraversal()
    return this.sortedList.map((user, index) => ({
      ...user,
      rank: index + 1
    }))
  }
}
module.exports = { LeaderboardBST };